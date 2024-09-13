'use server'

import cloudinary from "../cloudinary";

type imageProps = {
  public_id: string;
  secure_url: string;
};


export const deleteApartmentImages = async (images:imageProps[]) => {
  try {
    const publicIds = images.map(image => image.public_id);
    const response = await cloudinary.api.delete_resources(publicIds);
    console.log('Images deleted successfully:', response);
  } catch (error) {
    console.error('Error deleting images:', error);
  }
};