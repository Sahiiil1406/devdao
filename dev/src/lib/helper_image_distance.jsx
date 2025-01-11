import React, { useState } from "react";

const ImageComparison = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const secondImage = `/image2.jpg`; // The existing image in the folder

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setUploadedImage(objectUrl);
    }
  };

  const compareImages = async () => {
    if (!uploadedImage) {
      alert("Please upload the first image.");
      return;
    }
  
    try {
      setLoading(true);
      setResult(null); 
  
      const uploadedBlob = await fetch(uploadedImage).then((res) => res.blob());
      const secondBlob = await fetch(secondImage).then((res) => res.blob());
  
      const formData = new FormData();
      formData.append("image1", uploadedBlob, "image1.jpg");
      formData.append("image2", secondBlob, "image2.jpg");
  
      const response = await fetch(
        "https://www.wolframcloud.com/obj/codeninja0812/image-comparison-api",
        {
          method: "POST",
          body: formData,
        }
      );
  
      const rawResponse = await response.text(); 
      console.log("Raw API Response:", rawResponse);
  
      try {
        const jsonResult = JSON.parse(rawResponse); 
        console.log("Parsed JSON Result:", jsonResult);

        setResult(jsonResult);
  
        
      } catch (jsonError) {
        console.warn("Response is not JSON. Handling as plain text:", rawResponse);
  
        // If response is numeric, treat it as the distance value
        if (!isNaN(rawResponse)) {
          setResult(parseFloat(rawResponse)); 
        } else {
          console.error("Unexpected response:", rawResponse);
          alert("Failed to interpret server response.");
        }
      }
    } catch (error) {
      console.error("Error comparing images:", error);
      alert("Failed to compare images. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="text-black">
      <h1 className="text-black">Image Comparison Tool</h1>

      {/* Upload and Preview */}
      <div>
        <label>Upload an image:</label>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {uploadedImage && (
          <img src={uploadedImage} alt="Uploaded" width="200" />
        )}
      </div>

      {/* Compare Button */}
      <button onClick={compareImages} disabled={loading}>
        {loading ? "Comparing..." : "Compare"}
      </button>

      {/* Result */}
      {result !== null && (
        <div>
          <h2>Comparison Result</h2>
          {typeof result === "number" ? (
            <>
              <p>Image Distance: {result}</p>
              {result < 0.5 ? (
                <p>Images are very similar!</p>
              ) : result < 1.5 ? (
                <p>Images are moderately similar.</p>
              ) : (
                <p>Images are different.</p>
              )}
            </>
          ) : (
            <p>{result}</p> 
          )}
        </div>
      )}
    </div>
  );
};

export default ImageComparison;
