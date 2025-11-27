import axios from "axios";

/**
 * Uploads an image file to Cloudinary and returns the secure_url.
 * @param file The image file to upload.
 * @param uploadPreset The unsigned upload preset name from your Cloudinary settings.
 * @returns The secure_url string.
 */
export async function uploadImageToCloudinary(
  file: File,
  uploadPreset: string = "unsigned_preset"
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dubvzmk7g/image/upload",
    formData
  );
  return response.data.secure_url;
} 