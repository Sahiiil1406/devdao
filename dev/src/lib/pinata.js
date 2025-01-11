import { PinataSDK } from "pinata-web3"
import { useState } from "react";
export const pinata = new PinataSDK({
  pinataJwt: `${import.meta.env.VITE_PINATA_JWT}`,
  pinataGateway: `${import.meta.env.VITE_GATEWAY_URL}`
})
const handleSubmission = async (content) => {
    try {
      const blob = new Blob([content], { type: 'text/plain' });
  
      // Create a File object from the Blob (it will be uploaded as a file)
      const file = new File([blob], "content.txt", { type: 'text/plain' });
  
      // Upload the file to IPFS via Pinata
      const upload = await pinata.upload.file(file);
      
      // Log the uploaded file's details (including the IPFS hash)
      console.log(upload);
      return upload;
    } catch (error) {
      console.log(error);
    }
  };
const cidToGatewayUrl = (cid) => `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${cid}`
  
  module.exports = {
    handleSubmission,
    cidToGatewayUrl
  }


