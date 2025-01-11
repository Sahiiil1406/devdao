import { Sandpack } from "@codesandbox/sandpack-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { set } from "zod";

export default function App() {
	const [files, setFiles] = useState({});
	const [dependencies, setDependencies] = useState({});
	const [startFile, setStartFile] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const githubSrcApiUrl =
		"https://api.github.com/repos/Sahiiil1406/test/contents";
	const headers = {
		Accept: "application/vnd.github.v3+json",
		Authorization: "Bearer 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", // Uncomment for higher rate limits
	};
	const fetchSource = async () => {
		try {
			const res = await axios.get(`${githubSrcApiUrl}/src`, { headers });
			const srcFiles = res.data;

			const fetchedFiles = {};
			for (const file of srcFiles) {
				if (
					file.type === "file" &&
					(file.name.endsWith(".jsx") ||
						file.name.endsWith(".js") ||
						file.name.endsWith(".css"))
				) {
					const fileContentRes = await axios.get(file.download_url);
					fetchedFiles[`/${file.name}`] = {
						code: fileContentRes.data,
					};
				}
			}
		console.log("FETCHING FILES FROM GITHUB...");
			console.log(fetchedFiles["/App.jsx"]);
			setStartFile(fetchedFiles["/App.jsx"]);

			setFiles(fetchedFiles);
		} catch (error) {
			console.error("Error fetching files:", error);
		}
	};

	const getDependencies = async () => {
		try {
			const res = await axios.get(`${githubSrcApiUrl}/package.json`, {
				headers,
			});
			const packageJson = res.data;
			const fileContentRes = await axios.get(packageJson.download_url);
			const code = fileContentRes.data.dependencies;

			setDependencies({ ...code, ...fileContentRes.data.devDependencies });
		} catch (error) {
			console.error("Error fetching package.json:", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			await fetchSource();
			await getDependencies();
			//
			setIsLoading(false);
		};
		fetchData();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>; // Show a loading indicator while files are being fetched
	}

	return (
		<Sandpack
			key={JSON.stringify(files)} // Force re-render when files change
			template="react"
			options={{
				externalResources: ["https://cdn.tailwindcss.com"],
				visibleFiles: Object.keys(files),
				// activeFile:"/main.jsx"
			}}
			customSetup={{
				dependencies: dependencies,
			}}
			files={{ ...files, "/App.js": startFile.code }}
		/>
	);
}
