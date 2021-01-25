const {Router} = require("express")
const auth = require("../middelware/auth.middelware")
const Todo = require("../models/todo.model")
const Info = require("../models/info.model")
const router = Router()

router.post("/add", auth, async (req, res) => {
    try {
        const {sendedDate, title, categories} = req.body
        const newTerm = sendedDate
        const todo = new Todo({
            period: newTerm, title, owner: req.user.userId, categories
        })
        await todo.save()
        await res.status(201).json({todo})
    } catch (e) {
        res.status(500).json({message: "Something go wrong, pls try again!"})
    }
})

router.get("/all", auth, async (req, res) => {
    try {
        let info = await Info.findOne({owner: req.user.userId})
        if (info) {
            // console.log("list", info.time)
            const todos = await Todo.find({owner: req.user.userId})
            res.json({todos, info})
        } else {
            const todos = await Todo.find({owner: req.user.userId})
            info = {time: null}
            res.json({todos, info})
        }
    } catch (e) {
        res.status(500).json({message: "Something go wrong, pls try again!"})
    }
})

router.get("/byPagination", auth, async (req, res) => {
    try {
        let info = await Info.findOne({owner: req.user.userId})
        if (info) {
            const todos = await Todo.find({owner: req.user.userId}).countDocuments()
            // console.log(todos)
            // console.log("all", info.time)
            res.json({todos, info})
        }else{
            const todos = await Todo.find({owner: req.user.userId}).countDocuments()
            info = {time:null}
            res.json({todos,info})
        }
    } catch (e) {
        res.status(500).json({message: "Something go wrong, pls try again!"})
    }
})

router.post("/byLimitSkip", auth, async (req, res) => {
    try {
        const todos = await Todo.find({
            owner: req.user.userId,
        }).skip(req.body.skip).limit(req.body.limit)
        res.json({todos})
    } catch (e) {
        res.status(500).json({message: "Something go wrong, pls try again!"})
    }
})

router.post("/change/important", auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.body.id)

        todo.important = !!!req.body.important
        await todo.save()
        res.status(200).json({message: "success!"})
    } catch (e) {
        res.status(500).json({message: "Something go wrong, pls try again!"})
    }
})
router.post("/change/done", auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.body.id)
        todo.done = !!!req.body.done
        await todo.save()
        res.status(200).json({message: "success!"})
    } catch (e) {
        res.status(500).json({message: "Something go wrong, pls try again!"})
    }
})
router.post("/change/delete", auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.body.id)
        todo.deleteOne()
        // await todo.save()
        res.status(200).json({message: "success!"})
    } catch (e) {
        res.status(500).json({message: "Something go wrong, pls try again!"})
    }
})
module.exports = router