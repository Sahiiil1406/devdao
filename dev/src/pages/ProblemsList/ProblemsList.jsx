import React from "react";
import { Spotlight } from "@/components/ui/spotlight";
import ProblemsGrid from "./ProblemsGrid";

export default function ProblemsList() {
	return (
		<>
			<div className=" pt-16 pb-8 w-full rounded-md flex flex-col md:items-center md:justify-center bg-black/[0.96]  bg-grid-white/[0.02] relative ">
				{/* <Spotlight
				className="-top-40 left-0 md:left-60 md:-top-20"
				fill="white"
			/> */}
				<div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
					<h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 pb-2 ">
						Coding Challenges
					</h1>
					<p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
						Sharpen your coding skills with our curated collection of
						programming challenges. Filter by difficulty, search by name, and
						track your progress.
					</p>
				</div>
			</div>

			<ProblemsGrid />
		</>
	);
}
