import {InfiniteData, QueryFilters, useMutation, useQueryClient} from "@tanstack/react-query";
import { propertyProps } from "../types";
import { useToast } from "@/components/ui/use-toast";
import { deleteProperty, getDeleteProperty, } from "../actions/properties-actions";

type dataProps = {
  properties: propertyProps[];
  nextPage: number | undefined;
};


export const useDeleteProperty = (userId:string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: getDeleteProperty,
    onSuccess: async (singleProperty:propertyProps) => {
      const queryFilter: QueryFilters = { queryKey: ["added-properties", userId] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<dataProps, number>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextPage: page.nextPage,
              properties: page.properties.filter((item) => item._id !== singleProperty._id),
            })),
          };
        }
      );

      await deleteProperty(singleProperty._id).then((response) => {
        if (response?.success) {
          toast({
            variant: 'success',
            title: 'Success',
            description: response.success
          })
        }

        if (response?.error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: response.error
          })
        }

      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong, try again later'
      })
    },
  });

  return mutation;
};
