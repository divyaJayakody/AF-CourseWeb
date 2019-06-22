const mongoose =require('mongoose');
const Schema = mongoose.Schema;


let TCourse = new Schema({


    tcourse_code:{
        type:String
    },
    tcourse_name:{
        type:String
    },
    tcourse_semester:{
        type:String
    },
    tcourse_instructor:{
        type:String
    },
    tcourse_credits:{
        type:String
    },
    tcourse_approved_Date:{
        type:String
    }
});

module.exports= mongoose.model('TCourse',TCourse);
/** new pending course version
 *  code:{ == course_id
        type:String
    },
    name:{ == course_name
        type:String
    },
    semester:{ == NA
        type:String
    },
    incharge:{ == course_instructor
        type:String
    },
    credits:{ == NA
        type:String
    }

 */
