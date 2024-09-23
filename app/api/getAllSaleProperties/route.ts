import Agents from "@/lib/models/agents";
import Attachments from "@/lib/models/attachments";
import Properties from "@/lib/models/properties";
import Users from "@/lib/models/users";
import { connectToMongoDB } from "@/lib/utils";
import { FilterQuery } from "mongoose";


type searchQueryProps = {
  minimumPrice: string;
  maximumPrice: string;
  numberOfRooms: string
  numberOfToilets: string;
  state: string;
  city: string;
  propertyTag: string;
};

type paramProps = {
  searchParams: {[key: string]: string | undefined};
};

export const POST = async (request:Request) => {
  await connectToMongoDB();

  const { page, query } = await request.json();

  const value = page || undefined;
  const pageNumber = parseInt(value as string);
  const pageSize = 6;


  let searchValue;

  const buildQuery = (filters:searchQueryProps ): FilterQuery<any> => {
    const query: FilterQuery<paramProps> = { propertyTag: 'for-sale', };
    
    if (parseInt(filters.minimumPrice) > 0 ) {
      query.fullPropertyPrice = { $gte: filters.minimumPrice };
    }

    if (parseInt(filters.maximumPrice) > 0) {
      query.fullPropertyPrice = query.fullPropertyPrice || {};
      query.fullPropertyPrice.$lte = filters.maximumPrice;
    }
    if (filters.state) {
      query.state = filters.state;
    }
    if (filters.city) {
      query.city = filters.city;
    }
    if (parseInt(filters.numberOfRooms) > 0) {
      query.numberOfRooms = filters.numberOfRooms;
    }
    if (parseInt(filters.numberOfToilets) > 0) {
      query.numberOfToilets = filters.numberOfToilets;
    }

    if (filters.propertyTag) {
      query.propertyTag = filters.propertyTag;
    }
  
    return query;
  };
  

  if (query !== undefined) {
    searchValue = buildQuery(query);
  } else {
    searchValue = { propertyTag: 'for-rent' };
  }

  try {
    const properties = await Properties.find(searchValue)
    .populate({
      path: 'agent',
      model: Agents,
      select: '_id agencyName agentInspectionFee rating agencyWebsite licenseNumber',
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
    .sort({createdAt: 'descending'});

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
};