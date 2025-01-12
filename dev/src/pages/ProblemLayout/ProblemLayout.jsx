import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { submitProblem, submitQuestion } from "@/api/contract";
import { submitCode, checkDockerFile } from "@/api/api";
import { Outlet } from "react-router";
import { problems } from "@/lib/data";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";

const ProblemDetails = ({
  heading,
  difficulty,
  category,
  description,
  minting,
  setMinting,
}) => {
  const mainSubmit = async () => {
    setMinting(true); // Show minting overlay

    // Example logic for minting
    const id = "1";
    const userToFunction = "supersen14";
    const code = "<h1>Hello World!</h1>";

    try {
      const y = await submitCode(
        "67829c4c6c711e636eafd730",
        code,
        userToFunction
      );
      console.log(y);
      await submitProblem(userToFunction);
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setMinting(false); // Hide minting overlay after submission
    }
  };

  return (
    <div className="space-y-4 pr-4">
      {minting && (
        <div className="w-full h-screen bg-black/70 fixed top-0 left-0 z-[40] flex justify-center items-center flex-col gap-2">
          <img
            className="w-full max-w-[200px] object-contain rounded-[40px]"
            src="https://media2.giphy.com/media/Xn2xCPbUeDYKFtU1YT/giphy.gif?cid=6c09b952kpb46bez5o7753j9fjzwwdm8y6a9n3eo1tziexuz&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Minting in progress"
          />
          <TextShimmerWave
            className="font-mono text-2xl mt-4 font-bold"
            duration={1}
          >
            Minting Your NFT's
          </TextShimmerWave>
        </div>
      )}

      <h1 className="text-2xl font-bold mr-4">{heading}</h1>
      <div className="flex space-x-2">
        <span className="px-2 py-1 text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">
          {difficulty}
        </span>
        <span className="px-2 py-1 text-sm font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">
          {category}
        </span>
      </div>
      <p className="text-gray-400 dark:text-gray-300 ">{description}</p>
      <button
        className="rounded-full bg-[#18DF16] font-bold px-4 py-2 hover:opacity-75 transition duration-300"
        onClick={mainSubmit}
      >
        Submit
      </button>
    </div>
  );
};

const DummyContent = () => (
  <div className="h-[90vh] bg-[#1e1e1e] rounded-xl border border-[#3f3f46] ml-2 overflow-hidden">
    <Outlet />
  </div>
);

export default function ProblemLayout() {
  const { id } = useParams();
  const problemToBeShown = problems.find((problem) => problem.id == id);
  const { title, description, category, difficulty } = problemToBeShown;
  const [minting, setMinting] = useState(false); // Add state to control minting overlay

  return (
    <div className="h-[100vh] bg-black text-white p-4 m-0 pt-0">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel defaultSize={20} minSize={20} className="box-border">
          <div className="flex p-6 bg-[#27272A] rounded-xl border border-[#3f3f46] mr-2 h-[90vh]">
            <ProblemDetails
              heading={title}
              difficulty={difficulty}
              category={category}
              description={description}
              minting={minting}
              setMinting={setMinting} // Pass the minting state down to ProblemDetails
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
