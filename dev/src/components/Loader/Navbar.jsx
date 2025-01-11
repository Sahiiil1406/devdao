import React from "react";
import { Home, User, Settings } from "lucide-react"; // Import icons from Lucide React
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<nav className="bg-black text-white p-4 flex items-center justify-between">
			{/* Main Name/Brand */}
			<Link to="/" className="text-xl font-bold">
				DevDao
			</Link>
			<div className="text-blue-400 space-x-6 font-semibold">
				<Link to="/problem/test">React</Link>
				<Link to="/problem/css">CSS</Link>
				<Link to="/problem/system">Systems</Link>
			</div>

			{/* Icons */}
			<div className="flex space-x-6">
				<a href="/" className="hover:text-gray-300">
					<Home size={24} />
				</a>
				<Link to="/auth" className="hover:text-gray-300">
					<User size={24} />
				</Link>
			</div>
		</nav>
	);
}
