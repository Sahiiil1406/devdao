import {
  Database,
  GlobeLock,
  Laptop,
  Network,
  Pickaxe,
  Route,
} from "lucide-react";
import React from "react";

export default function featuresHeading() {
  return (
    <div className="w-full flex">
      <div className="mx-auto max-w-[1300px] w-full flex items-center justify-between ">
        <h1 className="text-4xl md:text-7xl font-bold  bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          <i>Learn & Practice</i>
          <br />
          Destination
        </h1>
        <div className="flex gap-12 pr-12 ">
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
