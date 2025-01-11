const mongoose=require('mongoose');

const submissionSchema = new mongoose.Schema({
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question',
        required:true
    },
    user:{
        type:String
    },
    code:{
        type:String,
        default:null
    },


},{timestamps:true})

const Submission = mongoose.model('Submission',submissionSchema)
module.exports = Submission