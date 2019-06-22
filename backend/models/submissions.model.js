const mongoose =require('mongoose');
const Schema = mongoose.Schema;

let Submission = new Schema({

    sub_stud_itno:{
        type:String
    },
    sub_up_date:{
        type:String
    },
    sub_course:{
        type:String
    },
    sub_assign:{
        type:String
    },
    sub_file:{
        type:String
    }

});

module.exports= mongoose.model('Submission',Submission );