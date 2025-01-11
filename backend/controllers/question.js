const Question = require('../models/question');

const getQuestions = async (req, res) => {
    try {
        const id=req.params.id;
        const questions = await Question.findById(id);
        return res.status(200).json(questions);
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const createQuestion = async (req, res) => {
    try {
        const question = req.body;
        const newQuestion = new Question(question);
        await newQuestion.save();
        return res.status(201).json(newQuestion);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        return res.status(200).json(questions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
}

module.exports={
    getQuestions,
    createQuestion,
    getAllQuestions
}