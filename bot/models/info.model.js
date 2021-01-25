const {Schema,model,Types} = require("mongoose")

const schema = new Schema({
    first_name:{type:String,default:null},
    second_name:{type:String,default:null},
    telegramm: {type:String,default:null},
    time:{type:Number,default:null},
    warning:{type:Boolean,default:true},
    owner:[{type:Types.ObjectId,ref:"User"}]
})
module.exports = model("Info",schema)