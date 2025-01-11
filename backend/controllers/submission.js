const Submission = require('../models/submission');

const submitCode = async (req, res) => {
    try {
        const { code,user } = req.body;
        const questionId = req.params.id;
        const submission = new Submission({
            questionId,
            user,
            code
        });
        await submission.save();
        res.status(201).send(submission);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports ={
    submitCode
}