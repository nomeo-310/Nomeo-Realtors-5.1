import {InfiniteData, QueryFilters, useMutation, useQueryClient} from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { deleteBlog, getBlog } from "../actions/blog-action";
import { blogProps, userProps } from "../types";


type dataProps = {
  blogs: blogProps[];
  nextPage: number | undefined;
};

export const useDeleteBlog = ({user, path}:{user:userProps, path:string}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: getBlog,
    onSuccess: async (singleBlog:blogProps) => {
      const queryFilter: QueryFilters = { queryKey: ["added-posts", user._id] };
      
      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<dataProps, number>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextPage: page.nextPage,
              blogs: page.blogs.filter((item) => item._id !== singleBlog._id),
            })),
          };
        }
      );

      await deleteBlog({blogId:singleBlog._id, path: path}).then((response) => {
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