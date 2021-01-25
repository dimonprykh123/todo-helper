const {Schema,model,Types} = require("mongoose")
const schema = Schema({
    title:{type:String,required:true},
    period:{type:String},
    categories:{type:String},
    sendedWarning:{type:Boolean,default:false},
    date:{type:Date,default:Date.now},
    done:{type:Boolean,default: false},
    important:{type:Boolean,default:false},
    owner:[{type:Types.ObjectId,ref:"User"}],

})
module.exports = model("Todos",schema)