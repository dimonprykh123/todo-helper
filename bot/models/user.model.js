const {model,Schema,Types} = require("mongoose")

const schema = new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required: true},
    name:{type:String,required:true,unique:true},
    register_date:{type:Date,default:Date.now},
    todos:[{type:Types.ObjectId,ref:"Todos"}]
})

module.exports = model("User",schema)