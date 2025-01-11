import React, { useState, useRef } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Compare from "@/components/compare";
import html2canvas from "html2canvas";
import ImageComparison from "@/lib/helper_image_distance";

const CssChallengesEditor = ({ initialFiles }) => {
  const [files, setFiles] = useState(initialFiles);
  const previewRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState("");

  const handleCodeChange = (newCode, filePath) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [filePath]: {
        ...prevFiles[filePath],
        code: newCode,
      },
    }));
  };

  const handleCapture = async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          logging: true,
          scale: 2,
          // Wait for all content to load
          onclone: (clonedDoc) => {
            return new Promise((resolve) => {
              setTimeout(resolve, 1000);
            });
          },
          // Improve rendering of nested elements
          foreignObjectRendering: true,
        });

        const imgData = canvas.toDataURL("image/png");
        setCapturedImage(imgData);
      } catch (error) {
        console.error("Error capturing image:", error);
      }
    }
  };

  const downloadImage = () => {
    if (capturedImage) {
      const link = document.createElement("a");
      link.href = capturedImage;
      link.download = "captured_preview.png";
      link.click();
    }
  };

  return (
    <SandpackProvider template="vanilla" theme="dark">
      <SandpackLayout className="h-[90vh] rounded-xl overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-[96vh] flex flex-col"
        >
          <ResizablePanel defaultSize={60} minSize={0}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50} minSize={20}>
                <SandpackCodeEditor
                  className="h-full"
                  extensions={[autocompletion()]}
                  extensionsKeymap={[completionKeymap]}
                />
              </ResizablePanel>
              <ResizableHandle className="bg-slate-700" />
              <ResizablePanel defaultSize={50} minSize={20}>
                <SandpackFileExplorer className="h-full" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle className="bg-slate-700" />
          <ResizablePanel
            defaultSize={40}
            minSize={0}
            className="flex flex-col justify-center items-center p-4"
          >
            <div className="w-full h-[300px] bg-white ">
              <Compare>
                <div
                  className="h-full w-full relative"
                  ref={previewRef}
                  style={{ transform: "translateZ(0)" }}
                >
                  <SandpackPreview className="h-full absolute inset-0" />
                </div>
                <img
                  src="/api/placeholder/400/300"
                  className="w-full h-full object-cover"
                  alt="Target"
                />
              </Compare>
            </div>
            {/* <div className="mt-8 space-x-4">
							<button
								onClick={handleCapture}
								className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
							>
								Capture Preview
							</button>
							{capturedImage && (
								<button
									onClick={downloadImage}
									className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
								>
									Download Image
								</button>
							)}
						</div> */}
            <ImageComparison />
          </ResizablePanel>
        </ResizablePanelGroup>
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default CssChallengesEditor;
