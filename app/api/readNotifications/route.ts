import { getCurrentUser } from "@/lib/actions/user-actions";
import Notifications from "@/lib/models/notifications";
import { connectToMongoDB } from "@/lib/utils";


export const PATCH = async () => {
  await connectToMongoDB();

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return Response.json({error: 'Unathourized'}, {status: 401})
    };

   await Notifications.updateMany({recipient: currentUser._id, seen: false}, {seen: true})

   return Response.json({success: 'All notification has been marked as read'}, {status: 200});
  } catch (error) {
    console.error(error)
    return Response.json({error: 'Internal server error, try again later'}, {status: 500}); 
  }
};