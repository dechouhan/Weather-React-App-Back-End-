const mongoose = require('mongoose');
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const logsSchema = new mongoose.Schema({
    date:{
        type:Date,
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
})
//we are creating a new collection
const Logs = new mongoose.model('logs',logsSchema)

module.exports = Logs;