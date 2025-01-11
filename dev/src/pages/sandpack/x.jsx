import React, { useState } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackTests,
  SandpackPreview,
  SandpackConsole,
  useSandpack
} from '@codesandbox/sandpack-react';


import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { dracula } from '@codesandbox/sandpack-themes';

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
      customSetup={{dependencies}}
      theme={dracula}
      
    >
      <SandpackLayout>
      <SandpackCodeEditor
        extensions={[autocompletion()]}
        extensionsKeymap={[completionKeymap]}
      />
        <SandpackPreview />
        <SandpackTests />
        
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
