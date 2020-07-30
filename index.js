const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
require('dotenv').config()
var Courses = require('./js/courses')

const WizardScene = require('telegraf/scenes/wizard')
const token = process.env.BOT_TOKEN
const bot = new Telegraf(token)

var currentCourse;
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

// bot.on('text', ctx => {
        
//   let msg = ctx.update.message.text
//   for (const course of Courses.coreCourses){
//       if (msg == course) return [getCurrentCourse(msg), getCurrentCode(msg)];
//   }
// })
bot.command('learn', ctx => ctx.reply('Choose on what course you want info', 
    Markup.keyboard(Courses.initList).resize().extra()))

bot.command('stop', (ctx) => {
    ctx.reply(':)', Extra.markup((m) => m.removeKeyboard()))
  })

bot.hears('Core courses info', ctx => {
  ctx.reply('Choose on what course you want info', 
    Markup.keyboard(Courses.coreCourses)
    .resize()
    .extra());
}
)

bot.hears('Other CS Courses', ctx => {
  
const coursesWizard = new WizardScene('courses', (ctx) => {
  
    ctx.reply('Choose on what course you want info', Markup.keyboard(
      Courses.otherCsCourses)
      .resize()
      .extra()
      )
      return ctx.wizard.next()
  },
  (ctx) => {
    const currentCourse = ctx.update.message.text
    ctx.reply('Choose ' + currentCourse, 
    Markup.keyboard(Courses.courseKeyboard).resize().extra())


  })
})

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