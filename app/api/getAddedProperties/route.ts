import { getCurrentUser } from "@/lib/actions/user-actions";
import Agents from "@/lib/models/agents";
import Attachments from "@/lib/models/attachments";
import Properties from "@/lib/models/properties";
import Users from "@/lib/models/users";
import { connectToMongoDB } from "@/lib/utils";

export const POST = async(request:Request) => {

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return Response.json({error: 'Unauthorized'}, {status: 404});
  };

  if (currentUser.role !== 'agent') {
    return Response.json({error: 'Unauthorized'}, {status: 404});
  };


  const { page } = await request.json();
  const value = page || undefined;
  const pageNumber = parseInt(value as string);
  const pageSize = 6;

  await connectToMongoDB();

  try {
    const properties = await Properties.find({agent: currentUser.isAgent})
    .populate({
      path: 'agent',
      model: Agents,
      select: 'agencyName agentInspectionFee rating agencyWebsite licenseNumber',
      populate: {
        path: 'user',
        model: Users,
        select: '_id name image'
      }
    })
    .populate({
      path: 'images',
      model: Attachments,
      select: 'attachments'
    })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize + 1)
    .sort({createdAt: -1})

    const nextPage = properties.length > pageSize ? pageNumber + 1 : undefined;

    const data = {
      properties: properties.slice(0, pageSize),
      nextPage: nextPage
    };

    return Response.json(data);
  } catch (error) {
    console.error(error)
    return Response.json({error: 'Internal server error'}, {status: 500});
  }
}