import React from "react";
import { useParams } from "react-router-dom";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { submitProblem, submitQuestion } from "@/api/contract";
import { submitCode, checkDockerFile } from "@/api/api";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router";
import { useContext } from "react";
import { UserProvider } from "@/context/userContext";

const mainSubmit = () => {
	const {id} = useParams();
	const {user} = useContext(UserProvider);
	const userToFunction = user?.email || 'supersen@gmail.com'
	const code = '<h1>Hello World!</h1>'
	submitCode(id, code, userToFunction);
	submitProblem(userToFunction);
}

const ProblemDetails = ({ heading, difficulty, category, description }) => (
	<div className="space-y-4 ">
		<h1 className="text-2xl font-bold">{heading}</h1>
		<div className="flex space-x-2">
			<span className="px-2 py-1 text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">
				{difficulty}
			</span>
			<span className="px-2 py-1 text-sm font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">
				{category}
			</span>
		</div>
		<p className="text-gray-400 dark:text-gray-300">{description}</p>
		<button className="rounded-full bg-[#18DF16] font-bold px-4 py-2 hover:opacity-75 transition duration-300" onClick={mainSubmit}>Submit</button>
	</div>
);

const DummyContent = () => (
	<div className="h-[90vh] bg-[#1e1e1e] rounded-xl border border-[#3f3f46]  ml-2 overflow-hidden">
		<Outlet />
	</div>
);

export default function ProblemLayout() {
	return (
		<div className="h-[100vh] bg-black  text-white p-4 m-0 pt-0">
			<ResizablePanelGroup direction="horizontal" className="min-h-screen">
				<ResizablePanel defaultSize={20} minSize={20} className="box-border">
					<div className="flex p-6 bg-[#27272A] rounded-xl border border-[#3f3f46] mr-2 h-[90vh] ">
						<ProblemDetails
							heading="Two Sum"
							difficulty="Easy"
							category="Arrays & Hashing"
							description="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
						/>
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle={false} className="bg-[#27272A] h-[90vh]" />
				<ResizablePanel defaultSize={60}>
					<DummyContent />
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
