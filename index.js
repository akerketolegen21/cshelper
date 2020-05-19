const Telegraf = require('telegraf')
require('dotenv').config()

const token = process.env.BOT_TOKEN
const bot = new Telegraf(token)

bot.start('text', ctx => ctx.reply("Hey, ${ctx.from.first_name} we're here to help our fellow CS students with course and career info! Let's start! Привет, мы хотим помочь студентам CS с курсами и поделиться другими полезными материалами! Начнем!"))
bot.help(ctx => ctx.reply("Here's our small FAQ section"))
bot.launch()