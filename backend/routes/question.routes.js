const express=require('express')
const router=express.Router()
const {createQuestion,getQuestions,getAllQuestions}=require('../controllers/question.js')

const {submitCode}=require('../controllers/submission')

router.get('/question/:id',getQuestions)
router.post('/questions',createQuestion)
router.get('/allquestions',getAllQuestions)
router.post('/submit/:id',submitCode)


module.exports=router