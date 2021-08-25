const mongoose = require('mongoose');
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const historySchema = new mongoose.Schema({
    date:{
        type:String,
        required:true,
        default:Date.now

    },
    time:{
        type:String,
        required:true,
    },
    email:{
        type:String,    
        required:true,

    },
    city:{
        type:String,    
        required:true,
    },
})
//we are creating a new collection
const History = new mongoose.model('history',historySchema)

module.exports = History;