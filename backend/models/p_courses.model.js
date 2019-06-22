const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const Course =require('./tcourse.model');

let course = new Schema({


    code:{
        type:String
    },
    name:{
        type:String
    },
    semester:{
        type:String
    },
    incharge:{
        type:String
    },
    credits:{
        type:String
    }
});

module.exports= mongoose.model('course',course);

/*
* pCourse_id:{ == code
        type:String
    },
    pCourse_name:{ == name
        type:String
    },
    pCourse_instructor:{ == incharge
        type:String
    },
    pCourse_approved_Date:{ == removed, not practical
        type:String
    }
*
*
*
* */