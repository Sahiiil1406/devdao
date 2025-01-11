import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css"; // Example of using a theme
import "codemirror/mode/javascript/javascript"; // Support for JavaScript

import { Editor } from "@monaco-editor/react";
export default function DevOps() {
	return (
		<div className="w-full h-full">
			<CodeEditor />
		</div>
	);
}

function CodeEditor() {
	return (
		<Editor
			className="mt-4 "
			height="100%"
			theme="vs-dark"
			defaultLanguage="python"
			defaultValue="// Write your code here..."
		/>
	);
}
