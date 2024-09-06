import { getCurrentUser } from "@/lib/actions/user-actions";
import Agents from "@/lib/models/agents";
import Blogs from "@/lib/models/blogs";
import Users from "@/lib/models/users";
import { connectToMongoDB } from "@/lib/utils";

export const POST = async(request:Request) => {

  const { page } = await request.json();
  const value = page || undefined;
  const pageNumber = parseInt(value as string);
  const pageSize = 12;

  await connectToMongoDB();

  try {
    const blogs = await Blogs.find()
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
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize + 1)
    .sort({createdAt: -1})

    const nextPage = blogs.length > pageSize ? pageNumber + 1 : undefined;

    const data = {
      blogs: blogs.slice(0, pageSize),
      nextPage: nextPage
    };

    return Response.json(data);
  } catch (error) {
    console.error(error)
    return Response.json({error: 'Internal server error'}, {status: 500});
  }
}