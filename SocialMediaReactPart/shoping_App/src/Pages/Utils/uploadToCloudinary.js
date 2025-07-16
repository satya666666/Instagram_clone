// Utility function to upload media files to Cloudinary
export const uploadToCloudinary = async (file, fileType = "video") => {
  if (!file) return null;

  const cloud_name = "dng5zwftk";
  const upload_preset = "Ramji Gupta";

  try {
    // Create form data
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    // Upload to Cloudinary
    const url = `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`;
    
    const res = await fetch(url, { 
      method: "POST", 
      body: data 
    });

    if (!res.ok) {
      throw new Error(`Cloudinary upload failed: ${res.statusText}`);
    }

    const fileData = await res.json();
    console.log("Cloudinary upload successful:", fileData);
    
    return {
      url: fileData.secure_url,
      publicId: fileData.public_id
    };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};
