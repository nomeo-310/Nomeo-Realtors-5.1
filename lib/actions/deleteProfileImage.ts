'use server'

import cloudinary from "../cloudinary";


export const deleteCloudinaryImages = (publicId:string) => {
  cloudinary.uploader.destroy(publicId, function(error: any,result: any) {
    console.log(result, error) })
    .then((resp: any) => console.log(resp))
    .catch((_err: any) => console.log("Something went wrong, please try again later.")
  );
};