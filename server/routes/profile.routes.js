const {Router} = require("express")
const router = Router()
const Info = require("../models/info.model")
const auth = require("../middelware/auth.middelware")
router.post("/profile", auth, async (req, res) => {
    try {
        const {first_name, second_name, telegramm, time} = req.body
        const exist = await Info.findOne({owner: req.user.userId})
        if (exist) {
            const newExist = await Info.findOneAndUpdate({owner: req.user.userId}, {
                telegramm,
                first_name,
                second_name,
                time
            }, {new: true})
            // console.log(newExist)
            await newExist.save()
            res.status(201).json(newExist)
        } else {
            const info = new Info({
                telegramm,
                first_name,
                second_name,
                time,
                owner: req.user.userId
            })
            await info.save()
            res.status(201).json({info})
        }
    } catch (e) {
        res.status(500).json({message: "Server error!"})
    }
})

router.get("/profile", auth, async (req, res) => {
    try {
        const info = await Info.findOne({owner: req.user.userId})
        res.json(info)
    } catch (e) {
        res.status(500).json({message: "Server error!"})
    }
})

router.post("/warning",auth, async(req,res)=>{
    try{
        const {warning} = req.body
        const exist = await Info.findOne({owner: req.user.userId})
        if(exist){
          const newInfo = await  Info.findOneAndUpdate({owner: req.user.userId},{
              warning
          },{new:true})
            await newInfo.save()
            res.json(newInfo)
        }else{
            const newInfo = new Info({
                warning,
                owner: req.user.userId
            })
            await newInfo.save()
           res.json({newInfo})
        }
    }catch (e) {
        res.status(500).json({message: "Server error!"})
    }
})

module.exports = router
