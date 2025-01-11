import React from "react";

import CssChallengesEditor from "./CssChallengesEditor.jsx";
//Wolfram--->maths(Image recogition)
const initialFiles = {
	"index.html": {
		code: "",
	},
	"index.css": { code: "" },
};

const CssChallenges = () => <CssChallengesEditor initialFiles={initialFiles} />;

export default CssChallenges;
