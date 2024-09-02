import Agents from "@/lib/models/agents";
import Attachments from "@/lib/models/attachments";
import Properties from "@/lib/models/properties";
import Users from "@/lib/models/users";
import { connectToMongoDB } from "@/lib/utils";

export const GET = async() => {
  await connectToMongoDB();

  try {
    const properties = await Properties.find()
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
    .limit(6)
    .sort({createdAt: -1})

    return Response.json(properties);
  } catch (error) {
    console.error(error)
    return Response.json({error: 'Internal server error'}, {status: 500});
  }
}