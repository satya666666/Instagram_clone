const cloud_name = "dng5zwftk";
const upload_preset = "Ramji Gupta";

export const uploadToCloudinary = async (pics, fileType = "image") => {
    try {
        if (!pics) {
            throw new Error("File is required for upload.");
        }

        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", upload_preset);

        const url = `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`;

        const res = await fetch(url, { method: "POST", body: data });

        if (!res.ok) {
            throw new Error(`Cloudinary upload failed: ${res.statusText}`);
        }

        const fileData = await res.json();
        console.log("Uploaded file URL:", fileData.secure_url);
        return fileData.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};
