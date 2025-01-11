const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    rating: {
        type: Number,
        default: 1000
    },
    createdBy:{
        type:String
    },
    gitUrl:{
        type:String
    },
    category:{
        type:String,
        enum:['System Design','Algorithms','Devops','Frontend','Backend','Database','Others'],
        default:'Frontend'
    },
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;