import React from "react";

export default function LoginPage() {
	return (
		<div className="w-full h-screen fixed top-0 left-0 z-[20] bg-black flex ">
			<img src="login.png" alt="" className="flex-1 object-cover " />
			<div className="flex-1 text-white p-8 flex flex-col max-w-[600px] items-center justify-center">
				<img src="logo.png " alt="" className="h-[120px] object-contain" />
				<p className="">One Stop Destination to Learn Development</p>
			</div>
		</div>
	);
}
