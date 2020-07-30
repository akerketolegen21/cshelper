const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
require('dotenv').config()
var Courses = require('./courses')

const token = process.env.BOT_TOKEN
const bot = new Telegraf(token)

var currentCourseName, currentCourseCode;
var steps = 0;
bot.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log('Response time: %sms', ms)
})
bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)})

bot.start((ctx) => ctx.reply("Hey, "+ctx.message.from.first_name+", we're here to help our fellow CS students with course and career info! Let's start! Привет, мы хотим помочь студентам CS с курсами и поделиться другими полезными материалами! Начнем!"))

bot.help(ctx => ctx.reply("Here's our small FAQ section"))

bot.command('learn', ctx => ctx.reply('Choose on what course you want info', 
    Markup.keyboard(Courses.initList)
    .resize()
    .extra()
)
)
bot.command('stop', (ctx) => {
    ctx.reply(':)', Extra.markup((m) => m.removeKeyboard()))
  })

bot.hears('Core courses info', ctx => {
  currentCourseName = Courses.getCurrentCourse(ctx.session.lastMessage);
  currentCourseCode = Courses.getCurrentCode(ctx.session.lastMessage);
  return ctx.reply('Choose on what course you want info', 
    Markup.keyboard(Courses.coreCourses)
    .resize()
    .extra())
}
)


bot.hears('Other CS Courses', ctx => {
  return ctx.reply('Choose on what course you want info', Markup.keyboard(
    Courses.otherCsCourses)
    .resize()
    .extra()
    ) }
    )

bot.hears("CSCI 151: Programming for Scientists and Engineers", ctx => ctx.reply('Choose' , 
    Markup.keyboard(Courses.courseKeyboard).resize()
    .extra()
    ))

bot.hears("151 Syllabus", ctx=> ctx.replyWithHtml(ctx.chat.id, "Sign in or sign up to this site to see the official website", Extra.Markup.inlineKeyboard([
    Markup.urlButton('Syllabus: Course Info', 'https://sst-csci.com/csci151/syllabus/about-the-course/'), 
    Markup.callbackButton('Delete', 'delete')
])))



bot.launch()

// TODO: after choosing the course, each time parse the string to save current course, course code
// to find further like this switch 'CSCI': case '151', case '152' etc.
// TODO: going back