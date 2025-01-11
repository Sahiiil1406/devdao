import React from "react";
import {
	Home,
	User,
	Settings,
	Code,
	FileText,
	Cpu,
	GitBranch,
} from "lucide-react"; // Import appropriate icons from Lucide React
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<nav className="bg-none text-white p-4 flex items-center justify-between">
			{/* Main Name/Brand */}
			<Link to="/" className="text-xl font-bold  flex gap-2 items-center">
				<img src="/logo.png" className="h-[40px] ml-4" alt="DevDao" />
				<div className="bg-gray-200/20 h-[30px] w-[1px]"></div>

				<p className="font-[200] text-sm  italic text-gray-200/60 ">
					One Stop Destination <br />
					to Learn Development
				</p>
			</Link>

			<div className="text-gray-500 space-x-6 font-semibold flex">
				<Link
					to="/problem/react"
					className="hover:text-gray-300 flex items-center gap-2"
				>
					<Code size={20} className="text-gray-400" />
					React
				</Link>
				<Link
					to="/problem/css"
					className="hover:text-gray-300 flex items-center gap-2"
				>
					<FileText size={20} className="text-gray-400" />
					CSS
				</Link>
				<Link
					to="/problem/system"
					className="hover:text-gray-300 flex items-center gap-2"
				>
					<Cpu size={20} className="text-gray-400" />
					System Design
				</Link>
				<Link
					to="/problems"
					className="hover:text-gray-300 flex items-center gap-2"
				>
					<GitBranch size={20} className="text-gray-400" />
					Problems List
				</Link>
			</div>

			{/* Icons */}
			<div className="flex space-x-6">
				<a href="/" className="hover:text-gray-300">
					<Home
						size={24}
						className="transition-all transform hover:scale-110"
					/>
				</a>
				<Link to="/auth" className="hover:text-gray-300">
					<User
						size={24}
						className="transition-all transform hover:scale-110"
					/>
				</Link>
				{/* Optional Settings icon */}
				<Link to="/settings" className="hover:text-gray-300">
					<Settings
						size={24}
						className="transition-all transform hover:scale-110"
					/>
				</Link>
			</div>
		</nav>
	);
}
