import { OrbitingCircles } from "@/components/ui/orbiting-circles";
export function OrbitingCirclesDemo() {
	return (
		<div className="relative flex h-[550px] w-[500px] ml-auto mb-auto flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
			<span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
				Dev<span className="text-blue-500/70">Dao</span>
			</span>

			{/* First Orbit */}
			<OrbitingCircles iconSize={40} radius={240} className="border-red-50">
				<img src="docker.svg" alt="WhatsApp" width={40} height={40} />
				<img src="css_old.svg" alt="Notion" width={40} height={40} />
				<img src="django.svg" alt="OpenAI" width={40} height={40} />

				<img src="eth.svg" alt="Google Drive" width={40} height={40} />
			</OrbitingCircles>

			{/* Second Orbit */}
			<OrbitingCircles iconSize={30} radius={160} speed={1.5}>
				<img src="html5.svg" alt="WhatsApp" width={35} height={35} />
				<img src="kubernetes.svg" alt="Notion" width={35} height={35} />
				<img src="mongodb.svg" alt="OpenAI" width={35} height={35} />
			</OrbitingCircles>

			{/* Third Orbit */}
			<OrbitingCircles iconSize={30} radius={120} reverse speed={2}>
				<img src="nodejs.svg" alt="WhatsApp" width={30} height={30} />
				<img src="react.svg" alt="Notion" width={30} height={30} />
				<img src="redis.svg" alt="OpenAI" width={30} height={30} />
			</OrbitingCircles>

			{/* Fourth Orbit */}
			<OrbitingCircles iconSize={25} radius={70} reverse speed={1}>
				<img src="ruby.svg" alt="WhatsApp" width={25} height={25} />
				<img src="redux.svg" alt="Notion" width={25} height={25} />
			</OrbitingCircles>
		</div>
	);
}
