import { getCurrentUser } from "@/lib/actions/user-actions";
import Notifications from "@/lib/models/notifications";
import Users from "@/lib/models/users";
import { connectToMongoDB } from "@/lib/utils";

export const POST = async (request:Request) => {
  const { page } = await request.json();
  await connectToMongoDB();

  try {
    const value = page || undefined;
    const pageNumber = parseInt(value as string);
    const pageSize = 6;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return Response.json({error: 'Unathourized'}, {status: 401})
    };

    const notifications = await Notifications.find({recipient: currentUser._id})
    .populate({
      path: 'issuer',
      model: Users,
      select: 'name email phoneNumber image'
    })
    .sort({createdAt: 'descending'})
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize + 1);

    const nextPage = notifications.length > pageSize ? pageNumber + 1 : undefined;

    const data = {
      notifications: notifications.slice(0, pageSize),
      nextPage: nextPage
    };

    return Response.json(data)
  } catch (error) {
    console.error(error)
    return Response.json({error: 'Internal server error, try again later'}, {status: 500}); 
  }
}