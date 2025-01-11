import React, { Suspense, lazy, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import {UserProvider} from './context/userContext';
import Sand from './pages/sandpack/sand'
import Test from './pages/sandpack/test'
import Auth from './pages/AuthPage/AuthPage'

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
			<UserProvider>
				<Routes>
				<Route path="/sand" element={<Sand />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/test" element={<Test />} />
		
			</Routes>
			</UserProvider>
			{/* </Suspense> */}
		</>
	);
}
