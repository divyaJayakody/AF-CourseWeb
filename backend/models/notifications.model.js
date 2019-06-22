const mongoose =require('mongoose');
const Schema = mongoose.Schema;

let Notification = new Schema({

    receiver_id:{
        type:String
    },
    date:{
        type:String
    },
    message:{
        type:String
    }
});

module.exports= mongoose.model('Notification',Notification);