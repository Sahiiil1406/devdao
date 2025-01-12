import DotPattern from "@/components/ui/dot-pattern";
import { TextLoop } from "@/components/ui/text-loop";
import { cn } from "@/lib/utils";

export function TextLoopCustomVariantsTransition() {
	return (
		<p className=" relative font-bold  bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50  whitespace-pre-wrap ">
			<DotPattern
				className={cn(
					"[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
				)}
			/>
			<p>
				Learn & Practice <br />{" "}
			</p>

			<TextLoop
				className="overflow-y-clip font-bold  bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 z-4"
				transition={{
					stiffness: 900,
					damping: 80,
					mass: 10,
				}}
				variants={{
					initial: {
						y: 20,
						rotateX: 90,
						opacity: 0,
						filter: "blur(4px)",
					},
					animate: {
						y: 0,
						rotateX: 0,
						opacity: 1,
						filter: "blur(0px)",
					},
					exit: {
						y: -20,
						rotateX: -90,
						opacity: 0,
						filter: "blur(4px)",
					},
				}}
			>
				<span>Frontend</span>
				<span>Backend</span>
				<span>DevOps</span>
				<span>System Design</span>
				<span>WEB 3</span>
			</TextLoop>
		</p>
	);
}
