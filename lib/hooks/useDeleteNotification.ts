import {InfiniteData, QueryFilters, useMutation, useQueryClient} from "@tanstack/react-query";
import { notificationProps } from "../types";
import { useToast } from "@/components/ui/use-toast";
import { deleteNotification, getSingleNotification } from "../actions/notification-actions";

type dataProps = {
  notifications: notificationProps[];
  nextPage: number | undefined;
};


export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: getSingleNotification,
    onSuccess: async (returnedNotification:notificationProps) => {
      const queryFilter: QueryFilters = { queryKey: ["notifications"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<dataProps, number>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextPage: page.nextPage,
              notifications: page.notifications.filter((item) => item._id !== returnedNotification._id),
            })),
          };
        }
      );

      await deleteNotification(returnedNotification._id).then((response) => {
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
