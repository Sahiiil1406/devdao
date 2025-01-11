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
} from "@codesandbox/sandpack-react";

import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import { amethyst, dracula } from "@codesandbox/sandpack-themes";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";

const CodeEditorWithTests = ({ initialFiles, dependencies }) => {
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
	console.log(dependencies);

	return (
		<SandpackProvider
			template="react"
			files={files}
			customSetup={{ dependencies }}
			theme="dark"
		>
			<SandpackLayout className=" h-[90vh] rounde-xl overflow-hidden ">
				{/* Top section with File Explorer and Code Editor */}
				<ResizablePanelGroup
					direction="vertical"
					className="h-[96vh] flex flex-col"
				>
					<ResizablePanel defaultSize={60} minSize={20} className="">
						<ResizablePanelGroup direction="horizontal">
							<ResizablePanel defaultSize={20} minSize={20} className="">
								<SandpackFileExplorer className="h-full" />
							</ResizablePanel>
							<ResizableHandle className="bg-slate-700" />
							<ResizablePanel defaultSize={80} minSize={20} className="">
								<SandpackCodeEditor
									className="h-full"
									extensions={[autocompletion()]}
									extensionsKeymap={[completionKeymap]}
								/>
							</ResizablePanel>
						</ResizablePanelGroup>
					</ResizablePanel>
					<ResizableHandle className="bg-slate-700" />
					{/* Bottom section with Preview and Tests */}
					<ResizablePanel defaultSize={50} minSize={0} className="">
						<ResizablePanelGroup direction="horizontal">
							<ResizablePanel defaultSize={50} minSize={0} className="">
								<SandpackTests className="h-full" />
							</ResizablePanel>
							<ResizableHandle className="bg-slate-700" />
							<ResizablePanel defaultSize={50} minSize={0} className="">
								<SandpackPreview className="h-full" />
							</ResizablePanel>
						</ResizablePanelGroup>
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

export default CodeEditorWithTests;
