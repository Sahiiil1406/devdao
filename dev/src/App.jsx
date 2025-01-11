import React, { Suspense, lazy, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import Sand from './pages/sandpack/sand'
import Test from './pages/sandpack/test'

export default function App() {
	// const [isLoadingComplete, setIsLoadingComplete] = useState(false);
	// const location = useLocation();

	// // This function will be called when the StartLoader is done loading
	// const handleLoaderComplete = () => {
	// 	setIsLoadingComplete(true);
	// };

	return (
		<>
			{/* <StartLoader onComplete={handleLoaderComplete} />
			{isLoadingComplete && ( */}

			{/* <Navbar /> */}
			{/* <Suspense fallback={<Loader />}> */}
			<Routes>
				<Route path="/sand" element={<Sand />} />
				<Route path="/test" element={<Test />} />
		
			</Routes>
			{/* </Suspense> */}
		</>
	);
}
