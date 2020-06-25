const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
require('dotenv').config()
const token = process.env.BOT_TOKEN
const bot = new Telegraf(token)

bot.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log('Response time: %sms', ms)
  })


  bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
  })
bot.start((ctx) => ctx.reply("Hey, "+ctx.message.from.first_name+", we're here to help our fellow CS students with course and career info! Let's start! Привет, мы хотим помочь студентам CS с курсами и поделиться другими полезными материалами! Начнем!"))

bot.help(ctx => ctx.reply("Here's our small FAQ section"))

bot.command('learn', ctx => ctx.reply('Choose on what course you want info', Markup.keyboard(
    ['Core courses info', 'Other CS Courses', 'Non-CS Technical electives', 'Natural science electives']
    )
    .resize()
    .extra()
)
)
bot.hears('Core courses info', ctx => ctx.reply('Choose on what course you want info', Markup.keyboard(
    ['CSCI 151: Programming for Scientists and Engineers', 'CSCI 152: Performance and Data Structures', 
    'CSCI 231: Computer Systems and Organizations', 'CSCI 235: Programming Languages',  'CSCI 270: Algorithms', 
    'CSCI 272: Formal Languages', 'ROBT 206: Microcontrollers with Lab',
    'CSCI 307: Research Methods', 'CSCI 332: Operating Systems', 'CSCI 333: Computer Networks', 
    'CSCI 341: Database Systems', 'CSCI  361: Software Engineering', 
    'CSCI 390: Artificial Intelligence', 'CSCI 408: Senior Project I', 'CSCI 409: Senior Project II']
    )
    .resize()
    .extra()))

bot.hears('Other CS Courses', ctx => ctx.reply('Choose on what course you want info', Markup.keyboard(
    ['CSCI 245: Systems Analysis and Design', 'CSCI 262: Software Project Management', 'CSCI 281: Human-Computer Interaction',
    'CSCI 281: Human-Computer Interaction', 'CSCI 325: High Performance Computing', 'CSCI 330: Mobile Computing',
    'CSCI 331: Advanced Mobile Computing', 'CSCI 336: Ubiquity and Sensing'
    ])
    .resize()
    .extra()
    ))

bot.hears("CSCI 151: Programming for Scientists and Engineers", Markup.keyboard(['151 Syllabus', '151 Tips', '151 Web-site', '151 Prof']))
bot.hears("151 Syllabus", ctx=> ctx.replyWithHtml(ctx.chat.id, "Sign in or sign up to this site to see the official website", Extra.Markup.inlineKeyboard([
    Markup.urlButton('Syllabus: Course Info', 'https://sst-csci.com/csci151/syllabus/about-the-course/'), 
    Markup.callbackButton('Delete', 'delete')
])))
bot.launch()