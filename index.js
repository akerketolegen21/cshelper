const Telegraf = require('telegraf')
const { Composer } = require('micro-bot')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
require('dotenv').config()
var Courses = require('./js/courses')
const tools = require('./js/tools')
const wizardScene = require('telegraf/scenes/wizard')
const Stage = require('telegraf/stage')
const { leave } = Stage
// const token = process.env.BOT_TOKEN
// const bot = new Telegraf(token)

const bot = new Composer
var currentCourse, fbMessage;
bot.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log('Response time: %sms', ms)
})

// bot.catch((err, ctx) => {
//     console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)})


bot.start((ctx) => ctx.reply("Hey, "+ctx.message.from.first_name+", we're here to help our fellow CS students with course and career info! \nEnter /learn to start!\nПривет, мы хотим помочь студентам CS с курсами и поделиться другими полезными материалами!\nВведите /learn, чтобы начать!"))

bot.help(ctx => ctx.reply("Here's our small FAQ section"))

bot.command('learn', ctx => ctx.reply('Choose on what courses you want info', 
    Markup.keyboard(Courses.initList).resize().extra()))

bot.command('stop', (ctx) => {
    ctx.reply(':)', Extra.markup((m) => m.removeKeyboard()))
  })

const feedBackScene = new wizardScene('feedback',  (ctx) => {
  ctx.reply('Please, leave your feedback here. If you are willing to help with course materials for this bot, ' +
  'leave the course name and the material name you are going to contribute. Thank you for using this bot.')
  fbMessage
  return ctx.wizard.next()
}, (ctx) => {
  fbMessage = ctx.message.message_id
  ctx.telegram.forwardMessage(Courses.c_id, ctx.chat.id, fbMessage)
  return ctx.scene.leave()
}
 )
 var currentscene
 const coursesScene = new wizardScene('othercourses',  (ctx) => {
  ctx.reply('Choose on what course you want info', Markup.keyboard(
  Courses.otherCsCourses)
  .resize()
  .extra())
  currentscene = 'othercourses'
  return ctx.wizard.next()
}, (ctx) => {
  currentCourse = ctx.message.text
  if (currentCourse == Courses.courseKeyboard[0][3]) {
    currentCourse = ''
    ctx.reply('Choose on what courses you want info', 
  Markup.keyboard(Courses.initList).resize().extra())
  return ctx.scene.leave()
}
  ctx.reply('Choose', 
  Markup.keyboard(Courses.courseKeyboard).resize().extra())
  return ctx.wizard.next()
 }, (ctx) => {
  var s = ctx.message.text
  if ( s == Courses.courseKeyboard[0][0]) tools.syllabi(currentscene, currentCourse, ctx)
  else if (s == Courses.courseKeyboard[0][1]) tools.tips(currentscene, currentCourse, ctx)
  else if (s == Courses.courseKeyboard[0][2]) tools.website(currentscene, currentCourse, ctx)
  else if (s == Courses.courseKeyboard[0][3]) {
    currentCourse = ''
    ctx.scene.enter(currentscene)
  }
  return ctx.scene.leave()
}
)


const coreCoursesScene = new wizardScene('corecourses',  (ctx) => {
  ctx.reply('Choose on what course you want info', 
    Markup.keyboard(Courses.coreCourses)
    .resize()
    .extra())
  currentscene = 'corecourses'
  return ctx.wizard.next()
}, (ctx) => {
 currentCourse = ctx.message.text
 if (currentCourse == Courses.courseKeyboard[0][3]) {
   currentCourse = ''
   ctx.reply('Choose on what courses you want info', 
 Markup.keyboard(Courses.initList).resize().extra())
  return ctx.scene.leave()
}
  ctx.reply('Choose', 
  Markup.keyboard(Courses.courseKeyboard).resize().extra())
  return ctx.wizard.next()
 }, (ctx) => {
  var s = ctx.message.text
  if ( s == Courses.courseKeyboard[0][0]) tools.syllabi(currentscene, currentCourse, ctx)
  else if (s == Courses.courseKeyboard[0][1]) tools.tips(currentscene, currentCourse, ctx)
  else if (s == Courses.courseKeyboard[0][2]) tools.website(currentscene, currentCourse, ctx)
  else if (s == Courses.courseKeyboard[0][3]) {
    currentCourse = ''
    ctx.scene.enter(currentscene)
  }
  return ctx.scene.leave()
}
)

const stage = new Stage()

stage.register(coursesScene)
stage.register(coreCoursesScene)
stage.register(feedBackScene)

bot.use(Telegraf.session())
bot.use(stage.middleware()) 


bot.hears(Courses.initList[2], Stage.enter('othercourses'))
bot.hears(Courses.initList[1], Stage.enter('corecourses'))
bot.hears(Courses.initList[0], ctx => ctx.reply(Courses.freshmanTips))
bot.command('feedback', Stage.enter('feedback'))


// bot.launch()
module.exports = bot
// TODO: find a way to check whether a student is a NU stud
