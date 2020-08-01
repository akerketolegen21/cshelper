const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
require('dotenv').config()
var Courses = require('./js/courses')

const wizardScene = require('telegraf/scenes/wizard')
const Stage = require('telegraf/stage')
const { leave } = Stage
const token = process.env.BOT_TOKEN
const bot = new Telegraf(token)

var currentCourse;
bot.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log('Response time: %sms', ms)
})
bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)})

bot.start((ctx) => ctx.reply("Hey, "+ctx.message.from.first_name+", we're here to help our fellow CS students with course and career info! Enter /learn to start! Привет, мы хотим помочь студентам CS с курсами и поделиться другими полезными материалами! Введите /learn, чтобы начать!"))

bot.help(ctx => ctx.reply("Here's our small FAQ section"))

bot.command('learn', ctx => ctx.reply('Choose on what courses you want info', 
    Markup.keyboard(Courses.initList).resize().extra()))

bot.command('stop', (ctx) => {
    ctx.reply(':)', Extra.markup((m) => m.removeKeyboard()))
  })


const coursesScene = new wizardScene('othercourses',  (ctx) => {
  ctx.reply('Choose on what course you want info', Markup.keyboard(
  Courses.otherCsCourses)
  .resize()
  .extra())
  currentCourse
  return ctx.wizard.next()
}, (ctx) => {
  currentCourse = ctx.message.text
  if (currentCourse === 'Back') {
    currentCourse = ''
    ctx.reply('Choose on what courses you want info', 
  Markup.keyboard(Courses.initList).resize().extra())
  return ctx.scene.leave()
}
  ctx.reply('Choose ' + currentCourse, 
  Markup.keyboard(Courses.courseKeyboard).resize().extra())
  return ctx.wizard.next()
 }, (ctx) => {
   if (ctx.message.text === 'Syllabus') syllabi(currentCourse, ctx)
   else if (ctx.message.text === 'Tips') tips(currentCourse, ctx)
   else if (ctx.message.text ==='Web-site') website(currentCourse, ctx)
   else if (ctx.message.text === 'Back') {
     currentCourse = ''
     return ctx.scene.enter('othercourses')
   }
   return ctx.scene.leave()
 })

const coreCoursesScene = new wizardScene('corecourses',  (ctx) => {
  ctx.reply('Choose on what course you want info', 
    Markup.keyboard(Courses.coreCourses)
    .resize()
    .extra())
  currentCourse
  return ctx.wizard.next()
}, (ctx) => {
 currentCourse = ctx.message.text
 if (currentCourse === 'Back') {
   currentCourse = ''
   ctx.reply('Choose on what courses you want info', 
 Markup.keyboard(Courses.initList).resize().extra())
  return ctx.scene.leave()}
ctx.reply('Choose ' + currentCourse, 
 Markup.keyboard(Courses.courseKeyboard).resize().extra())
 return ctx.wizard.next()
}, (ctx) => {
  if (ctx.message.text === 'Syllabus') syllabi(currentCourse, ctx)
  else if (ctx.message.text === 'Tips') tips(currentCourse, ctx)
  else if (ctx.message.text === 'Web-site') website(currentCourse, ctx)
  else if (ctx.message.text === 'Back') {
    currentCourse = ''
    return ctx.scene.enter('corecourses')
  }
  return ctx.scene.leave()
})
const stage = new Stage()
stage.register(coursesScene)
stage.register(coreCoursesScene)
bot.use(Telegraf.session())
bot.use(stage.middleware()) 


bot.hears('Other CS Courses', Stage.enter('othercourses'))
bot.hears('Core courses info', Stage.enter('corecourses'))
// function syllabi (course, ctx) {
//   if (currentCourse[0] == 'CSCI') {
//       if (currentCourse[1] == '151') {
//           ctx.replyWithHTML("Sign in or sign up to this site to see the official website", Extra.HTML().markup(m =>
//             m.inlineKeyboard([
              
//               m.urlButton('Syllabus: Course Info', 'https://sst-csci.com/csci151/syllabus/about-the-course/'),
//               m.callbackButton('Delete', 'delete')]),))}
//   } 
  
// }
  
bot.launch()

// TODO: after choosing the course, each time parse the string to save current course, course code
// to find further like this switch 'CSCI': case '151', case '152' etc.
// TODO: going back