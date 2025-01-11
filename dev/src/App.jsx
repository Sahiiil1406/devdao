import React, { Suspense, lazy, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import { UserProvider } from "./context/userContext";
import Sand from "./pages/sandpack/sand";
import Test from "./pages/sandpack/test";
import Auth from "./pages/AuthPage/AuthPage";

import ProblemLayout from "./pages/ProblemLayout/ProblemLayout";
import Navbar from "./components/Loader/Navbar";
import CssChallenges from "./pages/sandpack/CssChallenges/CssChallengesEditor";
import { Card } from "./components/Card/Card";
import ProblemsList from "./pages/ProblemsList/ProblemsList";
import { Spotlight } from "./components/ui/spotlight";
import SystemDesign from "./pages/SystemDesign/SystemDesign";

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
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <UserProvider>
          <Routes>
            <Route path="/sand" element={<Sand />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/test" element={<Test />} />
            <Route path="/problem" element={<ProblemLayout />}>
              <Route path="/all" element={<ProblemsList />} />
              <Route path="react/:id" element={<Test />} />
              <Route path="css/:id" element={<CssChallenges />} />
              <Route path="system/:id" element={<SystemDesign />} />
            </Route>
            <Route path="/problems" element={<ProblemsList />} />
            <Route path="/testing" element={<Card />} />

          </Routes>
        </UserProvider>
      </div>
    </>
  );
}
