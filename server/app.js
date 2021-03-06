const express = require("express")
const mngdb = require("mongoose")
const config = require("config")
const path = require("path")
const app = express()

const _PORT = config.get("port") || 5000;


app.use(express.json({extended:true}))
app.use("/api/client/",require("./routes/profile.routes"))
app.use("/api/auth/",require("./routes/user.routes"))
app.use("/api/main/",require("./routes/todo.routes"))

async function start(){
    try {
        await mngdb.connect(config.get("mongoUrl"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify:false
        })
        app.listen(_PORT,()=>{
            console.log("Server started at port : "+ _PORT);
        })
    }catch (e) {
        console.log("Server error : " +  e.message)
        process.exit(1)
    }
}
start()
