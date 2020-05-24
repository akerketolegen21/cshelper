const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
require('dotenv').config()
const token = process.env.BOT_TOKEN
const bot = new Telegraf(token)

bot.start((ctx) => ctx.reply("Hey, "+ctx.message.from.first_name+", we're here to help our fellow CS students with course and career info! Let's start! Привет, мы хотим помочь студентам CS с курсами и поделиться другими полезными материалами! Начнем!"))

bot.help(ctx => ctx.reply("Here's our small FAQ section"))

bot.command('learn', ctx => ctx.reply('Choose on what course you want info', Markup.keyboard(
    ['Core courses info', 'Other CS Courses', 'Technical electives info', 'Natural science electives info']
    )
    .resize()
    .extra()
)
)
bot.on('Core courses info', ctx => ctx.reply('Choose on what course you want info', Markup.keyboard(
    ['CSCI 151: Programming for Scientists and Engineers', 'CSCI 152: Performance and Data Structures']
    )
    .resize()
    .extra()))
bot.launch()