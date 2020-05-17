const Telegraf = require('telegraf')
require('dotenv').config()

const token = process.env.BOT_TOKEN
const bot = new Telegraf(token)

bot.on('text', ctx => ctx.reply("Hey, we're here to help our fellow CS students with course and career info! Let's start! Привет, мы хотим помочь студентам CS с курсами и поделиться другими полезными материалами! Начнем!"))

bot.launch()