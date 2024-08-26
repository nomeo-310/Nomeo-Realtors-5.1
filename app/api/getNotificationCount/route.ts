import { getCurrentUser } from "@/lib/actions/user-actions";
import Notifications from "@/lib/models/notifications";
import { connectToMongoDB } from "@/lib/utils"

export const GET = async () => {
  await connectToMongoDB();
  
  try {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      return Response.json({error: 'Unathourized'}, {status: 401})
    };

    const notificationCount = await Notifications.countDocuments({recipient: currentUser._id, seen: false})
    const data = { unreadCounts: notificationCount };

    return Response.json(data);
  } catch (error) {
    console.error(error)
    return Response.json({error: 'Internal server error, try again later'}, {status: 500}); 
  }
}