const {Telegraf} = require('telegraf')
const mongodbconnect = require("mongoose")
const config = require("config")
const bot = new Telegraf(config.get("tgToken"))
const Info = require("./models/info.model")
const Todo = require("./models/todo.model")
const Session = require("./models/session.model")

//mongo connect
mongodbconnect.connect(config.get("mongoUrl"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

//const
const regex = new RegExp(/cat_[A-Za-z0-9]+/)

// func
function getTodos(ctx, today = null, imp = null) {
    Info.findOne({telegramm: ctx.from.id})
        .then(body => {
                if (!body) {
                    return ctx.reply("Unregistered user !")
                }
                const userId = body.owner[0]
                return Todo.find({owner: userId}).then(async (body) => {
                    if (!body) {
                        await ctx.reply("You have no task!")
                    }
                    let str = ""
                    if (imp)
                        str = "IMPORTANT-LIST"
                    if (today)
                        str = "TODAY-LIST"
                    if (!today && !imp)
                        str = "ALL-TIME-LIST"
                    await ctx.reply(`-------------${str}-------------`);
                    const todayDate = new Date()
                    const todayYear = todayDate.getFullYear()
                    const todayMonth = todayDate.getUTCMonth()
                    const todayDay = todayDate.getDate()
                    for (let i = 0; i < body.length; i++) {
                        const mark = body[i].important ? "Yes" : "No"
                        const done = body[i].done ? "Yes" : "No"
                        const searchDate = new Date(body[i].period)
                        const time = searchDate.toLocaleString("uk-UA", {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            weekday: 'long',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                        const searchYear = searchDate.getFullYear()
                        const searchMonth = searchDate.getUTCMonth()
                        const searchDay = searchDate.getDate()
                        if (todayYear === searchYear && todayMonth === searchMonth && todayDay === searchDay && !imp && today) {
                            await ctx.reply(`№${i + 1}- task: ${body[i].title} , categories: ${body[i].categories} , important: ${mark} , done: ${done}, time: ${time}`)
                        }
                        if (!today && imp && body[i].important) {
                            await ctx.reply(`№${i + 1}- task: ${body[i].title} , categories: ${body[i].categories} , important: ${mark} , done: ${done}, time: ${time}`)
                        }
                        if (!today && !imp)
                            await ctx.reply(`№${i + 1}- task: ${body[i].title} , categories: ${body[i].categories} , important: ${mark} , done: ${done}, time: ${time}`)
                    }
                    await ctx.reply("-----------END-OF-LIST-----------")
                })
            }
        )
}

function getCats(ctx, fil = null) {
    Info.findOne({telegramm: ctx.from.id})
        .then(body => {
            if (!body) {
                return ctx.reply("Unregistered user !")
            }
            const userId = body.owner[0]
            return Todo.find({owner: userId}).then(async body => {
                if (!body) {
                    await ctx.reply("You have no categories!")
                }
                if (!fil) {
                    await ctx.reply("-----------CATEGORIES-----------")
                    let categories = [];
                    for (let i = 0; i < body.length; i++) {
                        if (!categories.includes(body[i].categories))
                            await categories.push(body[i].categories)
                    }
                    for (let i = 0; i < categories.length; i++) {
                        await ctx.reply(`№${i + 1} - ${categories[i]}`)
                    }
                    await ctx.reply("---------CATEGORIES-END---------")
                }
                if (fil) {
                    await ctx.reply(`-----------${ctx.message.text.substr(5).toUpperCase()}-----------`)
                    for (let i = 0; i < body.length; i++) {
                        const mark = body[i].important ? "Yes" : "No"
                        const done = body[i].done ? "Yes" : "No"
                        const time = new Date(body[i].period).toLocaleString("uk-UA", {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            weekday: 'long',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                        if (body[i].categories === ctx.message.text.substr(5)) {
                            await ctx.reply(`№${i + 1}- task: ${body[i].title} , important: ${mark} , done: ${done}, time: ${time}`)
                        }
                    }
                    await ctx.reply("-----------END-OF-LIST-----------")
                }
            })
        })
}

async function IntReq() {
    const date = new Date().getTime()
    const todos = await Todo.find({done: false})
    const perons = await Info.find({warning:true})
    const session = await Session.find()
    const mass = []
    for (let g = 0; g < session.length; g++) {
        await mass.push(session[g].session_code)
    }
    for (let j = 0; j < perons.length; j++) {
        const warTime = 3600000 * Number(perons[j].time)
        const next = await mass.includes(Number(perons[j].telegramm))
        for (let i = 0; i < todos.length; i++) {
            const listDate = await new Date(todos[i].period).getTime()
            const rej_time = await new Date(todos[i].period).toLocaleString("uk-UA", {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit'
            })
            const nextTime = listDate - date < warTime
            const nextTodo = ((perons[j].owner[0]).toString() === (todos[i].owner[0]).toString())
            if ( nextTime && nextTodo && next && !todos[i].sendedWarning) {
                const imp_rej = `Dear ${perons[j].first_name} remember that at ${rej_time} you need to do ${todos[i].title} - it is important for You!`
                const nimp_rej = `Dear ${perons[j].first_name} remember that at ${rej_time} you need to do ${todos[i].title}.`
                const res = todos[i].important ? imp_rej : nimp_rej;
                bot.telegram.sendMessage(Number(perons[j].telegramm), res)
                const newStatus = await Todo.findById(todos[i]._id)
                newStatus.sendedWarning = !newStatus.sendedWarning
                await newStatus.save()
            }

        }
    }
}

setInterval(() => IntReq(), 10000)

bot.start((ctx) => {
    ctx.reply(`Greetings traveler! I am Board-helper bot , and i will hepl you with your tasks. More information you can find in my application in "info" page
    All commands:
    1) /get id - gives your id
    2) /all - show all tasks
    3) /important - show only important tasks
    4) /today - show today task list 
    5) /categories - all your categories of tasks 
    6) /cat_"your name of cat" - show tasks only with that categories 
    7) /help - to get all commands again 
     8) /notification_on - to on your notifications
    9) /notification_off - to off your notifications`)

})
bot.command('get_id', (ctx) => ctx.reply(`Your id - ${ctx.from.id}`))

bot.command('all', (ctx) => getTodos(ctx))

bot.command('important', (ctx) => getTodos(ctx, null, true))

bot.command('today', (ctx) => getTodos(ctx, true))

bot.command('categories', (ctx) => getCats(ctx))

bot.hears(regex, (ctx) => getCats(ctx, true))

bot.command("notification_on", async (ctx) => {
    const session = await Session.findOne({session_code: ctx.from.id})
    if (session) {
        await ctx.reply("Notification is already on")
    }
    if (!session) {
        const newSession = new Session({
            session_code: ctx.from.id
        })
        await newSession.save()
        await ctx.reply("Now Board-helper can send you notifications")
    }
})

bot.command("notification_off", async (ctx) => {
    const session = await Session.findOne({session_code: ctx.from.id})
    if (session) {
        session.deleteOne()
        session.save()
        await ctx.reply("Notification status off ")
    }
    if (!session) {
        ctx.reply("Notification is already off")
    }
})

bot.help((ctx) => ctx.reply(` All commands:
    1) /get id - gives your id
    2) /all - show all tasks
    3) /important - show only important tasks
    4) /today - show today task list 
    5) /categories - all your categories of tasks 
    6) /cat_"your name of cat" - show tasks only with that categories 
    7) /help - to get all commands again 
    8) /notification_on - to on your notifications
    9) /notification_off - to off your notifications `))

bot.startPolling()





