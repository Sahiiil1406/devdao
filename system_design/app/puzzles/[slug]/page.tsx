"use client";
import "reactflow/dist/style.css";
import React from "react";
import { ReactFlowProvider } from "reactflow";
import { PuzzleData } from "./_components/puzzle-data";
import { Flow } from "./_components/flow";

export default function Page() {
	return (
		<ReactFlowProvider>
			<div className="flex justify-between items-center w-full h-[100vh]">
				{/* <PuzzleData /> */}
				<div className="w-full  h-full">
					<Flow />
				</div>
			</div>
		</ReactFlowProvider>
	);
}
