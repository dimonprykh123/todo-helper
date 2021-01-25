const {Router} = require("express")
const {check, validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const router = Router()

router.post("/register",
    [
        check("email", "Incorrect email!").isEmail(),
        check("name", "To short name length").isLength({min: 1}),
        check("password", "To short password length").isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const error = validationResult(req)
            if (!error.isEmpty()) {
                return res.json({errors:error.array(), message: "Incorrect data in form!"})
            }
            const {name, password, email} = req.body
            const identity_f = await User.findOne({email})
            const identity_s = await User.findOne({name})
            if (identity_f) {
                res.status(400).json({message: "This email is already exist!"})
            }
            if (identity_s) {
                res.status(400).json({message: "This name is already exist!"})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            if (password.length >= 6) {
                const user = new User({email, name, password: hashedPassword})
                await user.save()
                res.status(201).json({message: "You successfully registered!",next:true})
            }

        } catch (e) {
            res.status(500).json({message: "Something go wrong please try again!"})
        }
    })

router.post("/login",
    [
        check("name", "Not correct name!").isLength({min:1}),
        check("password","Not correct password!").exists().isLength({min:6})
    ]
    , async (req, res) => {
    try{
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(400).json({errors: error.array(), message: "Incorrect data in form!"})
        }
        const {name,password} = req.body
        const user = await User.findOne({name})
        if(!user){
            res.status(400).json({message:"No exist name!"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json({message:"Incorrect password!"})
        }
        const token = jwt.sign(
            {userId:user.id},
            config.get("jwtSecret"),
            {expiresIn: "24h"}
            )
        res.json({userId: user.id,token})

    }catch (e) {
        res.status(500).json({message:"Something go wrong please try again!"})
    }
    })
module.exports = router