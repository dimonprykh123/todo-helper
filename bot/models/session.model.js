const {Schema, model} = require("mongoose")

const schema = new Schema({
    session_code: {type: Number, default: null}
})

module.exports = model("Session",schema)