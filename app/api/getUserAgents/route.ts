import { getCurrentUser } from "@/lib/actions/user-actions";
import Agents from "@/lib/models/agents";
import Users from "@/lib/models/users";
import { connectToMongoDB } from "@/lib/utils";

export const GET = async () => {
  await connectToMongoDB();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return Response.json({error: 'Unauthorized'}, {status: 404});
  };

  const userAgents = currentUser.agents;

  try {
    const agents = await Agents.find({_id: {$in: userAgents}})
    .populate({
      path: 'user',
      model: Users,
      select: '_id name image email phoneNumber',
    })
    .sort({createdAt: 'descending'})

    return Response.json(agents);
  } catch (error) {
    console.error(error)
    return Response.json({error: 'Internal server error'}, {status: 500});
  }
}