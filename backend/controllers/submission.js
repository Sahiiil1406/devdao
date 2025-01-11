const Question = require("../models/question");
const Submission = require("../models/submission");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const submitCode = async (req, res) => {
  try {
    const { code, user } = req.body;
    const questionId = req.params.id;
    const submission = new Submission({
      questionId,
      user,
      code,
    });
    await submission.save();
    res.status(201).send(submission);
  } catch (error) {
    res.status(400).send(error);
  }
};

const checkDockerFile = async (req, res) => {
  try {
    const { code, user } = req.body;
    const questionId = req.params.id;
    //call chatGPT API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const question=await Question.findById(id)
    const text=`${question.title} and ${question.description}`
    const prompt = `Our problem is ${text} and solution is ${code}.Answer in one word yes or no.Solution is correct or not.If it 80% or above correct say yes else no?`;
    const response = await model.generateContent([prompt]);
    console.log(response.response.candidates[0].content.parts[0].text);
    if(response.response.candidates[0].content.parts[0].text === "yes"){
      const submission = new Submission({
        questionId,
        user,
        code,
      });
        await submission.save();
    }
    res.status(200).send(response.response.candidates[0].content.parts[0].text);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  submitCode,
  checkDockerFile,
};
