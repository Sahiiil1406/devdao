import { ethers } from "ethers";
import {a} from "../../public/a.js";
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const abi = a.abi;
const submitProblem = async (name="supersen",gitUrl = 'https://github.com/sahil-mengji/open-commerce') => {
  try {
    let signer = null;
    let provider;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
    }
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      signer || provider
    );
    const res = await contract.submitProblem(name,gitUrl);
    return res;
  } catch (error) {
    console.log(error);
  }
};
const submitQuestion = async (question="test",giturl="fe") => {
  try {
    let signer = null;
    let provider;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
    }
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      signer || provider
    );
    const res = await contract.submitQuestion(question,giturl);
    return res;
  } catch (error) {
    console.log(error);
  }
};
const getProblemDetails = async (id=0) => {
    try {
        let signer = null;
    let provider;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
    }
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      signer || provider
    );
    const res = await contract.getProblemDetails(id);

        
    } catch (error) {
        console.log(error);
    }
};
const getTokenCounter = async () => {
    try {
        let signer = null;
    let provider;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
    }
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      signer || provider
    );
    const res = await contract.getTokenCounter();
    console.log(res);
        
    } catch (error) {
        console.log(error);
    }
};

export { submitProblem, submitQuestion, getProblemDetails, getTokenCounter };
