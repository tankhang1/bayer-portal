export const uploadBase64Image = async (
  base64: string,
  fileName: string
): Promise<void> => {
  try {
    // Extract Base64 content (remove the "data:image/png;base64," part if present)
    const base64Content = base64.split(",")[1];

    // Convert Base64 to binary data
    const binaryData = atob(base64Content);
    const byteArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob from the byte array
    const blob = new Blob([byteArray], { type: "image/png" });

    // Convert Blob to File
    const file = new File([blob], fileName, { type: "image/png" });

    // Create FormData and append the file
    const formData = new FormData();
    formData.append("files", file);

    // Send FormData via HTTP POST
    const response = await fetch(
      `https://reactive.icampaign.vn/upload-files/bayer/${fileName}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      console.log("Image uploaded successfully!");
    } else {
      console.error("Image upload failed!", await response.text());
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
