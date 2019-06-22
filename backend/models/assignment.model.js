const mongoose =require('mongoose');
const Schema = mongoose.Schema;


let Assignment = new Schema({

    assign_id:{
        type:String
    },
    assign_name:{
        type:String
    },
    assign_upload:{
        type:String
    },
    assign_course:{
        type:String
    },
    assign_dueDate:{
        type:String
    }
});

module.exports= mongoose.model('Assignment',Assignment);