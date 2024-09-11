import { getCurrentUser } from "@/lib/actions/user-actions";
import Inspections from "@/lib/models/inspections";
import Properties from "@/lib/models/properties";
import Users from "@/lib/models/users";
import { connectToMongoDB } from "@/lib/utils";

export const POST = async (request:Request) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (!user) {
    return Response.json({error: 'Unauthorized'}, {status: 401});
  };

  if (user.role !== 'agent') {
    return Response.json({error: 'Unauthorized'}, {status: 402});
  };

  const { page } = await request.json();
  const value = page || undefined;
  const pageNumber = parseInt(value as string);
  const pageSize = 6;

  try {
    const inspections = await Inspections.find({agent: user.isAgent})
    .populate({
      path: 'user',
      model: Users,
      select: 'name image phoneNumber email _id'
    })
    .populate({
      path: 'property',
      model: Properties,
      select: '_id propertyId address numberOfBath numberOfRooms numberOfToilets annualRent annualPayment monthlyRent city state fullPropertyPrice area propertyTag'      
    })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize + 1)
    .sort({createdAt: -1});

    const nextPage = inspections.length > pageSize ? pageNumber + 1 : undefined;

    const data = {
      inspections: inspections.slice(0, pageSize),
      nextPage: nextPage
    };

    return Response.json(data);
    
  } catch (error) {
    return Response.json({error: 'Internal server error'}, {status: 500});
  }

}

