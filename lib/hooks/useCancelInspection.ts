import {InfiniteData, QueryFilters, useMutation, useQueryClient} from "@tanstack/react-query";
import { userInspectionProps } from "../types";
import { cancelInspection, getCancelledInspection } from "../actions/inspection-action";
import { useToast } from "@/components/ui/use-toast";

type dataProps = {
  inspections: userInspectionProps[];
  nextPage: number | undefined;
};

type cancelProps = {
  userId: string;
  agentId: string;
  inspectionId: string;
}

export const useCancelInspection = ({userId, agentId, inspectionId}:cancelProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: getCancelledInspection,
    onSuccess: async (cancelledInspection:userInspectionProps) => {
      const queryFilter: QueryFilters = { queryKey: ["inspections", userId] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<dataProps, number>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextPage: page.nextPage,
              inspections: page.inspections.filter((item) => item._id !== cancelledInspection._id),
            })),
          };
        }
      );

      await cancelInspection({inspectionId: inspectionId, agentId: agentId}).then((response) => {
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
