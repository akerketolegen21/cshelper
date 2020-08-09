const Telegraf = require('telegraf')
// const { Composer } = require('micro-bot')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
require('dotenv').config()
var Courses = require('./js/courses')
const wizardScene = require('telegraf/scenes/wizard')
const Stage = require('telegraf/stage')
const { leave } = Stage
const token = process.env.BOT_TOKEN
const bot = new Telegraf
var currentCourse, fbMessage;
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

const feedBackScene = new wizardScene('feedback',  (ctx) => {
  ctx.reply('Please, leave your feedback here. If you are willing to help with course materials for this bot, ' +
  'leave the course name and the material name you are going to contribute. Thank you for using this bot.')
  fbMessage
  return ctx.wizard.next()
}, (ctx) => {
  fbMessage = ctx.message.message_id
  ctx.telegram.forwardMessage(456606872, ctx.chat.id, fbMessage)
  return ctx.scene.leave()
}
 )

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
  ctx.reply('Choose', 
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
ctx.reply('Choose', 
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
stage.register(feedBackScene)

bot.use(Telegraf.session())
bot.use(stage.middleware()) 


bot.hears('Other CS Courses', Stage.enter('othercourses'))
bot.hears('Core courses info', Stage.enter('corecourses'))
bot.command('feedback', Stage.enter('feedback'))
function syllabi (course, ctx) {
  courseCode = Courses.getCurrentCode(course)
  courseName = Courses.getCurrentCourse(course)
  if (courseName == 'ROBT' && courseCode == '206') 
      ctx.replyWithHTML('Download syllabus from here: https://vk.com/doc216151933_561554544 or https://app.box.com/s/wadtludmz6ajhn5s03z43zxol7sjlyeu')
    
  if ( courseName == 'MATH') {
  switch (courseCode) {
    case '161' :
        ctx.reply("Download syllabus here: https://app.box.com/s/x5jp0jx7yl68xz0gzlvkqzv05z4ussjt")
         break;
    case '162':
      ctx.reply("Download syllabus here: https://app.box.com/s/qlrd4obomz1nt0iygfdjtwyy6i84qyng")
         break;   
     default :
         ctx.reply("No syllabus available for this course. If you'd like to contribute, please click here /stop then /feedback",
         Markup.keyboard(Courses.initList).resize().extra())
         return ctx.scene.leave()

  }}
  if (courseName == 'PHYS'){
    switch ( courseCode ) {
      case '161':
          ctx.reply("Download syllabus here: https://app.box.com/s/v4xhaqyhztcdts7fnqax5kvv2en5odq1")
          break;
      case '162':
        ctx.reply("Download syllabus here: https://app.box.com/s/lu25web6wq45jxpp82355stgvz2fvt73")
          break;   
      default :
          ctx.reply("No syllabus available for this course. If you'd like to contribute, please click here /stop then /feedback", 
          Markup.keyboard(Courses.initList).resize().extra())
          return ctx.scene.leave()
  }
}
  if (courseName == 'CSCI'){
    switch (courseCode) {
        case '151' :
            ctx.replyWithHTML("Sign in or sign up to this site to see the official website", Extra.HTML().markup(m =>
              m.inlineKeyboard([
                
                m.urlButton('Syllabus: Course Info', 'https://sst-csci.com/csci151/syllabus/about-the-course/'),
                m.callbackButton('Delete', 'delete')]),))
              break;
        case '152':
          ctx.replyWithHTML("Sign in or sign up to this site to see the official website", Extra.HTML().markup(m =>
            m.inlineKeyboard([
              
              m.urlButton('Syllabus: Course Info', 'https://sst-csci.com/csci152/syllabus/about-the-course/'),
              m.callbackButton('Delete', 'delete')]),))
          break;
      
      case '231' :
        ctx.replyWithHTML('Download syllabus from here: https://vk.com/doc216151933_561550525 or https://app.box.com/s/7bep094hueb951lz3sdwbkamtdrn6hqg', Extra.webPreview(true))
        break;
      case '235' :
        ctx.replyWithHTML('Download syllabus from here: https://vk.com/doc216151933_561550482 or https://app.box.com/s/i4hxzfhqwzimgb9ee44lo24tvh4xni1v', Extra.webPreview(true))
        break;

      case '270' :
        ctx.replyWithHTML('Download syllabus from here: https://vk.com/doc216151933_561554596 or https://app.box.com/s/jsmsu6uduldkevsqmj20its0oi7kx811', Extra.webPreview(true))
        
        break;
      case '272' :
        ctx.replyWithHTML('Download syllabus from here: https://vk.com/doc216151933_561550540 or https://app.box.com/s/rurc6zl0ypk4ipryxfzmeqnz1rknool9')
        break;
      default :
          ctx.reply("No syllabus available for this course. If you'd like to contribute, please click here /stop then /feedback", 
          Markup.keyboard(Courses.initList).resize().extra())
          return ctx.scene.leave()
        }
  }
 
  return ctx.scene.enter('corecourses')
}

function tips(course, ctx){
  courseCode = Courses.getCurrentCode(course)
  courseName = Courses.getCurrentCourse(course)
  console.log(courseCode + ' ' + courseName)
  if ( courseName == 'MATH') {
    switch ( courseCode) {
      case '161' :
          ctx.reply("Download preparation for final exam: https://app.box.com/s/7bilpspn6dwo11jarrp8xgum50zoyzu5\n and \n" +
          "answers here https://app.box.com/s/25pdiwchgzxd3ryzw13ctozw3msyx14d")
          ctx.reply("You can find lecture notes here: https://app.box.com/s/pq7ns9atsmrcy5yc4la0smsimylf4c3i")
          break;
      case '162':
        ctx.reply("You can find lecture notes here: https://app.box.com/s/46f1s2utrvhz6utiedau82danzfnsuz7")
          break;   
      case '273' :
        ctx.reply("You can find lecture notes here: https://app.box.com/s/tgeobhpiywh2x96d5zz3fplj9m05i0fn")
          break; 
      default :
        ctx.reply("No tips available for this course. If you'd like to contribute, please click here /stop then /feedback", 
        Markup.keyboard(Courses.initList).resize().extra())
        return ctx.scene.leave()
  }
}
  if (courseName == 'PHYS'){
    switch ( courseCode) {
      case '161' :
        
          ctx.reply("You can find lecture notes here: https://app.box.com/s/1ifwjg16lv01km2oyd8aqdamv5gnrnd3")
          break;
      default :
          ctx.reply("No tips available for this course. If you'd like to contribute, please click here /stop then /feedback" ,
          Markup.keyboard(Courses.initList).resize().extra())
          return ctx.scene.leave()
  }
}
  if (courseName == 'CSCI') {
    switch (courseCode) {
        case '151' :
          ctx.reply(Courses.c151)
          break;
        case '152' :
          ctx.reply(Courses.c152)
          break;
        case '231' : //CSO
          ctx.reply(Courses.c231)
          break;
        case '235' : //PL
          ctx.reply(Courses.c235)
          break;
        case '341' : //DB
          ctx.reply(Courses.c341)
          break;
        case '332' : //OS
          ctx.reply(Courses.c332)
          break;
        case '361' : //SWE
          ctx.reply(Courses.c361)
          break;
        case '307' : //Research Methods
          ctx.reply(Courses.c307)
          break;
        default :
          ctx.reply("No tips available for this course. If you'd like to contribute, please click here /stop then /feedback", 
          Markup.keyboard(Courses.initList).resize().extra())
          return ctx.scene.leave()
        }
      }
  return ctx.scene.enter('corecourses')
}

function website(course, ctx){
  courseCode = Courses.getCurrentCode(course)
  courseName = Courses.getCurrentCourse(course)
  console.log(courseCode + ' ' + courseName)
  
  if (courseName == 'CSCI') {
      if (courseCode == '151' || courseCode == '152') {}
        ctx.replyWithHTML("Sign in or sign up to the official website of CSCI 151/152 and choose " + courseName + ' ' + courseCode, Extra.HTML().markup(m =>
          m.inlineKeyboard([
            
            m.urlButton('Syllabus: Course Info', 'https://sst-csci.com/'),
            m.callbackButton('Delete', 'delete')]),))
  }else{

        ctx.reply("No website for this course")
        
  }

  return ctx.scene.enter('corecourses')
}


bot.launch()
// module.exports = bot
// warm-bayou-82798
// https://warm-bayou-82798.herokuapp.com/
// TODO: find a way to check whether a student is a NU stud