import {
  Database,
  GlobeLock,
  Laptop,
  Network,
  Pickaxe,
  Route,
} from "lucide-react";
import React, { useState, useEffect } from "react";

export default function FeaturesHeading() {
  const phrases = ["Frontend", "Backend", "DevOps", "System Design", "WEB 3"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 2000); // Change phrase every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [phrases.length]);

  return (
    <div className="w-full flex pb-4">
      <div className="mx-auto max-w-[1300px] w-full flex items-center justify-between ">
        <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          <i className="font-normal text-opacity-30">Learn & Practice</i>
          <br />
          <span>{phrases[currentPhraseIndex]}</span>
        </h1>
        <div className="flex gap-12 pr-12">
          <Pickaxe
            size={60}
            className="text-blue-500/50 hover:text-blue-500/50 transition-400 cursor-pointer"
          />
          <Database
            size={60}
            className="text-red-500/50 hover:text-red-500/50 transition-400 cursor-pointer"
          />
          <Laptop
            size={60}
            className="text-green-500/50 hover:text-green-500/50 transition-400 cursor-pointer"
          />
          <Route
            size={60}
            className="text-orange-500/50 hover:text-orange-500/50 transition-400 cursor-pointer"
          />
          <GlobeLock
            size={60}
            className="text-purple-500/50 hover:text-purple-500/50 transition-400 cursor-pointer"
          />
          <Network
            size={60}
            className="text-yellow-500/50 hover:text-yellow-500/50 transition-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
