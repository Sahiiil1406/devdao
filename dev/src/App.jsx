import React, { Suspense, lazy, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import {UserProvider} from './context/userContext';
import Sand from './pages/sandpack/sand'
import Test from './pages/sandpack/test'
import Auth from './pages/AuthPage/AuthPage'

import ProblemLayout from "./pages/ProblemLayout/ProblemLayout";
import Navbar from "./components/Loader/Navbar";
import CssChallenges from "./pages/sandpack/CssChallenges/CssChallengesEditor";

export default function App() {
	// const [isLoadingComplete, setIsLoadingComplete] = useState(false);
	// const location = useLocation();

	// // This function will be called when the StartLoader is done loading
	// const handleLoaderComplete = () => {
	// 	setIsLoadingComplete(true);
	// };

	return (
		<>
			

			 <Navbar /> 
			
			<div className="bg-black overflow-y-hidden w-full max-h-screen h-screen">
			<UserProvider>
				<Routes>
				<Route path="/sand" element={<Sand />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/test" element={<Test />} />
				<Route path="/problem" element={<ProblemLayout />}>
						<Route path="test" element={<Test />} />
						<Route path="css" element={<CssChallenges />} />
					</Route>
		
			</Routes>
			</UserProvider>
			</div>
			
		</>
	);
}
