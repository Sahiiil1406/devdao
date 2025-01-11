import React, { useState } from "react";
import {
	SandpackProvider,
	SandpackLayout,
	SandpackCodeEditor,
	SandpackTests,
	SandpackPreview,
	SandpackConsole,
	useSandpack,
	SandpackFileExplorer,
	Sandpack,
} from "@codesandbox/sandpack-react";

import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { amethyst, dracula } from "@codesandbox/sandpack-themes";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";

const CssChallengesEditor = ({ initialFiles }) => {
	const [files, setFiles] = useState(initialFiles);

	const handleCodeChange = (newCode, filePath) => {
		setFiles((prevFiles) => ({
			...prevFiles,
			[filePath]: {
				...prevFiles[filePath],
				code: newCode,
			},
		}));
	};
	console.log(files);

	return (
		<SandpackProvider template="vanilla" theme="dark">
			<SandpackLayout className=" h-[90vh] rounde-xl overflow-hidden ">
				{/* Top section with File Explorer and Code Editor */}
				<ResizablePanelGroup
					direction="horizontal"
					className="h-[96vh] flex flex-col"
				>
					<ResizablePanel defaultSize={60} minSize={0} className="">
						<ResizablePanelGroup direction="vertical">
							<ResizablePanel defaultSize={50} minSize={20} className="">
								<SandpackCodeEditor
									className="h-full"
									extensions={[autocompletion()]}
									extensionsKeymap={[completionKeymap]}
								/>
							</ResizablePanel>
							<ResizableHandle className="bg-slate-700" />
							<ResizablePanel defaultSize={50} minSize={20} className="">
								<SandpackFileExplorer className="h-full" />
							</ResizablePanel>
						</ResizablePanelGroup>
					</ResizablePanel>
					<ResizableHandle className="bg-slate-700" />
					{/* Bottom section with Preview and Tests */}
					<ResizablePanel defaultSize={40} minSize={0} className="">
						<div>
							<SandpackPreview className="h-full" />
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</SandpackLayout>
		</SandpackProvider>
	);
};

// const ManualTestRunner = () => {
//   const { runTests } = useSandpack();

//   return (
//     <div>
//       <button onClick={runTests}>Run Tests</button>
//       <SandpackTests />
//     </div>
//   );
// };

export default CssChallengesEditor;
