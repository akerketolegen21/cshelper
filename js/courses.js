const { keyboard } = require("telegraf/markup");

const coreCourses = ['CSCI 151 : Programming for Scientists and Engineers', 'CSCI 152 : Performance and Data Structures', 
'MATH 161 : Calculus I', 'MATH 162 : Calculus II', 'PHYS 161 : Physics for Scientist and Engineers with Lab I',
'PHYS 162 : Physics for Scientist and Engineers with Lab II',
'CSCI 231 : Computer Systems and Organizations', 'CSCI 235 : Programming Languages',  'CSCI 270 : Algorithms', 
'CSCI 272  : Formal Languages', 'ROBT 206 : Microcontrollers with Lab',
'MATH 273 : Linear Algebra',
'CSCI 307 : Research Methods', 'CSCI 332 : Operating Systems', 'CSCI 333 : Computer Networks', 
'CSCI 341 : Database Systems', 'CSCI 361 : Software Engineering', 
'CSCI 390 : Artificial Intelligence', 'Back']

const otherCsCourses = ['CSCI 245 : Systems Analysis and Design', 'CSCI 262 : Software Project Management', 'CSCI 281 : Human-Computer Interaction',
'CSCI 281 : Human-Computer Interaction', 'CSCI 325 : High Performance Computing', 'CSCI 330 : Mobile Computing',
'CSCI 331 : Advanced Mobile Computing', 'CSCI 336 : Ubiquity and Sensing', 'Back'
]

const initList = ['Core courses info', 'Other CS Courses', 'Back']

const c151 = '1. Always do extra exercises after each lesson on the site, it will help you understand the topic deeper\n' + 
'2. Exercises are also the best way to prepare to the quizzes and the final exam\n' + 
'3. Repetition is key, make sure you repeat the information at least 5 mins in a day, including some coding practices\n' +
'4. Do not be scared to seek for help, ask your peers in a groupchat, a TA, someone will always be ready to help you out\n' + 
'5. Do not freak out, with time you will get used to practicing and coding frequently, which is a key to success'

const c152 = '1. Ask TAs for help, they are ready to do that for you\n' + 
'2. Try to understand Time and Space Complexities deeper, they are very important\n' + 
'3. Ask for additional challenges from TAs on Big(O) notations, Amortized Analysis and Performance Evaluation, they may cause a lot of troubles during quizzes\n' +
'4. Work consistently, repeat new concepts from time to time, studying everything the night before will not benefit you'

const c231 = "1. Although it may seem easy in the beginning, Mr. Park's part is totally about memorising, you may relax for A BIT on Mr. Sain's part\n" + 
'2. Do not ignore the theoretical part, you may regret your life decisions after seeing your grades\n' + 
'3. As MIPS is considered a low-level language, start donig your homework early, you will understand it better\n' +
'4. Prepare in your mind that you will have a lot of MIPS. A lot.'+
'5. The Interviewing period begins in Fall, so plan your time wisely'

const c235 = '1. If your prof is either Mr. Selim or Mr. Hans, then you need to memorise all of their slides, be prepared for that\n' + 
'2. Code, code, and code. PL is 60% coding, so you need to ace that\n' + 
'3. Listen to your prof carefully, you learn a lot of new things\n' +
'4. If you think that you are stuck, think about reading a few chapters of "C++ Primer"'

const c307 = "1. This course is quite easy but always remember that this is something like a prep for your Senior Project\n" + 
'2. Listen carefully about each prof and their fields of interest, thus you will successfully write your Final Proposal and Senior Project'

const c332 = "1. If you're in Mrs. Mona's group, try to learn more about the theoretical part, as you will be focusing on coding on C mostly\n" + 
"2. If you're in Mr. Park's group, code more on your own, as you will know more about memory, deadlocks, mutex vs semaphores, etc\n" + 
'3. You can learn more about theory from the free Udacity course, called Introduction to Operating Systems, will save you some time (and nerves) \n'

const c341 = "1. Always do your homework\n" + 
'2. Remember your theory: a bit of first/second/third normal forms, relations, the difference between SQL vs NoSQL\n' + 
'3. Learn SQL statements, you will mostly have them in your midterm and final exams\n' +
'4. Have some fun with databases, exercise frequently'

const c361 = "1. Learn a bit of Java and JavaScript (JQuery) \n" + 
'2. If you are having problems with idioms, try studying them from that book in the Moodle\n' + 
'3. Understand Java classes, functions, go through them repeatedly\n' +
'4. Prepare for all the concepts you have learned during midterm/final prep ("What is the result after the 3rd step in a '+
'Waterfall model?", "Agile Model elements are?")\n'+
'5. Do not forget about the practical part, like writing the code for processing GET requests on Java, "What if we call' +
"SomeClass.classElement.func(), where SomeClass is OtherClass's prototype (JS)\", \"Rewrite the JS callbacks using Promise\", and so on"

const courseKeyboard = [['Syllabus', 'Tips', 'Web-site', 'Back']]
function splitStr(str, param) { 
      
    // Function to split string 
    var string = str.split(" "); 
    var res = string[param - 1];
    return res;
} 
function getCurrentCourse(message) {
    let course = splitStr(message, 1);
    return course;
}
function getCurrentCode(message){
    let code = splitStr(message, 2);

    return code;
}


exports.coreCourses = coreCourses; exports.otherCsCourses = otherCsCourses; exports.initList = initList;
exports.courseKeyboard = courseKeyboard; exports.c151 = c151; exports.c152 = c152; exports.c231 = c231;
exports.c235 = c235; exports.c332 = c332; exports.c341 = c341; exports.c361 = c361; exports.c307 = c307;
exports.getCurrentCode = getCurrentCode; exports.getCurrentCourse = getCurrentCourse;