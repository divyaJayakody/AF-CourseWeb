const mongoose =require('mongoose');
const Schema = mongoose.Schema;


let Marks = new Schema({

    student_itno:{
        type:String
    },
    student_course:{
        type:String
    },
    student_assign:{
        type:String
    },
    student_marks:{
        type:String
    }
});

module.exports= mongoose.model('Marks',Marks);