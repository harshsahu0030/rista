import cloudinary from "cloudinary";
import ApiError from "./ApiError.js";

export const singleUploadCloudinary = async (image) => {
  try {
    let result = await cloudinary.v2.uploader.upload(image, {
      folder: "users",
    });

    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (err) {
    throw new ApiError(400, err.message);
  }
};

export const singledeleteCloudinary = async (image) => {
  try {
    let result = await cloudinary.v2.uploader.destroy(image, {
      folder: "users",
    });

    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (err) {
    throw new ApiError(400, err.message);
  }
};
