import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import React from "react";
import { OrbitingCirclesDemo } from "./Orbits";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { HeroScrollDemo } from "./showcase";
import { FeaturesSectionDemo } from "./Feature";
import FeaturesHeading from "./featuresHeading";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
const clientId = "BGgY-GW2jbtGpYSQYTirjT_6AcG5ihr6utEURPY0tIITv84tl7lIOTPEBnkJRgu_slOL7Ah0lnI23u-YWBNbRFM";

export default function LandingPage() {
  const [web3auth, setWeb3auth] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const { user, loginUser, logoutUser } = useContext(UserContext);

  useEffect(() => {
    const init = async () => {
      try {
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0xaa36a7", // hex of 11155111, Sepolia testnet //"0x7A69" for hardhat
          rpcTarget: "https://rpc.ankr.com/eth_sepolia", // "http://localhost:8545" Default Hardhat JSON-RPC server
          displayName: "Ethereum Sepolia Testnet",
          blockExplorer: "https://sepolia.etherscan.io", //empty for hardhat
          ticker: "ETH",
          tickerName: "Ethereum",
        };
        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: chainConfig,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          privateKeyProvider,
        });

        setWeb3auth(web3auth);
        await web3auth.initModal();
        console.log("Web3Auth initialized");
      } catch (error) {
        console.error("Error initializing Web3Auth:", error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
      const web3authProvider = await web3auth.connect();
      setLoggedIn(true);
      console.log("Logged in with Web3Auth", web3authProvider);
      await loginUser(await web3auth.getUserInfo());
    } catch (error) {
      console.error("Error logging in with Web3Auth:", error);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="flex px-8 pt-16 gap-12 h-[550px]">
        <div className=" flex-1 flex items-center justify-center">
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
            )}
          />
          <OrbitingCirclesDemo />
        </div>
        <div className=" p-4 flex-1  mx-auto relative z-10  w-full pt-32 md:pt-0 pb-0 ">
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
            )}
          />
          <h1 className="text-4xl md:text-7xl font-bold  bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            One Stop
            <br /> Destination to
            <br />
            Practice Development
          </h1>
          <p className="mt-4 font-normal text-base text-[20px] text-neutral-300/60 max-w-lg  ">
            Spotlight effect is a great way to draw attention to a specific part
            of the page. Here, we are drawing the attention towards the text
            section of the page. I don&apos;t know why but I&apos;m running out
            of copy.
          </p>
          <RainbowButton className="mt-8 text-xl py-8 rounded-2xl italic" onClick={login}>
            <b>Login </b>, to Get Started
          </RainbowButton>
        </div>
      </div>
      <HeroScrollDemo />
      <FeaturesHeading />
      <FeaturesSectionDemo />
    </div>
  );
}
