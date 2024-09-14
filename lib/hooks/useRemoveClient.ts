import {InfiniteData, QueryFilters, useMutation, useQueryClient} from "@tanstack/react-query";
import { clientProps } from "../types";
import { useToast } from "@/components/ui/use-toast";
import { getClient, terminateRent } from "../actions/rentout-actions";

type dataProps = {
  clients: clientProps[];
  nextPage: number | undefined;
};

type cancelProps = {
  userId: string;
  rentoutId: string;
}

export const useRemoveClient = ({userId, rentoutId}:cancelProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: getClient,
    onSuccess: async (singleClient:clientProps) => {
      const queryFilter: QueryFilters = { queryKey: ["clients", userId] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<dataProps, number>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextPage: page.nextPage,
              clients: page.clients.filter((item) => item._id !== singleClient._id),
            })),
          };
        }
      );

      await terminateRent(rentoutId).then((response) => {
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