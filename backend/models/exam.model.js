const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const Course =require('./tcourse.model');

let Exam = new Schema({

    exam_id:{
        type:String
    },
    exam_name:{
        type:String
    },
    exam_upload:{
        type:String
    },
   exam_course:{
        type:String
    },
   exam_dueDate:{
        type:String
    }
});

module.exports= mongoose.model('Exam',Exam);