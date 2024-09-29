import Agents from "@/lib/models/agents";
import Blogs from "@/lib/models/blogs";
import Users from "@/lib/models/users";
import { connectToMongoDB } from "@/lib/utils";

export const GET = async () => {
  await connectToMongoDB();

  try {
    const latestBlogs = await Blogs.find()
    .populate({
      path: 'author',
      model: Agents,
      select: 'agencyName agentBio licenseNumber',
      populate: {
        path: 'user',
        model: Users,
        select: 'name image _id'
      }
    })
    .limit(3)
    .sort({createdAt: 'descending'})

    return Response.json(latestBlogs);
  } catch (error) {
    console.error(error)
    
    return Response.json({error: 'Internal server error'}, {status: 500});
  }
}