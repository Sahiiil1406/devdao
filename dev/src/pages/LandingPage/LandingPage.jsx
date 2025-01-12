import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import React from "react";
import { OrbitingCirclesDemo } from "./Orbits";
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function LandingPage() {
	return (
		<div className="w-full min-h-screen">
			{" "}
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
					<RainbowButton className="mt-8 text-xl py-8 rounded-2xl">
						<b>Login </b>, to Get Started
					</RainbowButton>
				</div>
			</div>
		</div>
	);
}
