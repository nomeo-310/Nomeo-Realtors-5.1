import { getCurrentUser } from "@/lib/actions/user-actions";
import Properties from "@/lib/models/properties";
import Rentouts from "@/lib/models/rentouts";
import Users from "@/lib/models/users";
import { connectToMongoDB } from "@/lib/utils";

export const POST = async (request:Request) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (!user) {
    return Response.json({error: 'Unauthorized'}, {status: 402});
  }

  if (user.role !== 'agent') {
    return Response.json({error: 'Unauthorized'}, {status: 402});
  }

  const { page } = await request.json();
  const value = page || undefined;
  const pageNumber = parseInt(value as string);
  const pageSize = 6;

  try {
    const clients = await Rentouts.find({agent: user.isAgent})
    .populate({
      path: 'user',
      model: Users,
      select: 'name image phoneNumber occupation'
    })
    .populate({
      path: 'property',
      model: Properties,
      select: 'propertyId address city state numberOfRooms numberOfBath numberOfToilets area annualRent'
    })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize + 1)
    .sort({createdAt: 'descending'});

    const nextPage = clients.length > pageSize ? pageNumber + 1 : undefined;

    const data = {
      clients: clients.slice(0, pageSize),
      nextPage: nextPage
    };

    return Response.json(data);
  } catch (error) {
    return Response.json({error: 'Internal server error'}, {status: 500});
  }
}