const { keyboard } = require("telegraf/markup");

const coreCourses = ['CSCI 151 : Programming for Scientists and Engineers', 'CSCI 152 : Performance and Data Structures', 
'CSCI 231 : Computer Systems and Organizations', 'CSCI 235 : Programming Languages',  'CSCI 270 : Algorithms', 
'CSCI 272  : Formal Languages', 'ROBT 206 : Microcontrollers with Lab',
'CSCI 307 : Research Methods', 'CSCI 332 : Operating Systems', 'CSCI 333 : Computer Networks', 
'CSCI 341 : Database Systems', 'CSCI  361 : Software Engineering', 
'CSCI 390 : Artificial Intelligence', 'CSCI 408 : Senior Project I', 'CSCI 409 : Senior Project II', 'Back']

const otherCsCourses = ['CSCI 245 : Systems Analysis and Design', 'CSCI 262 : Software Project Management', 'CSCI 281 : Human-Computer Interaction',
'CSCI 281 : Human-Computer Interaction', 'CSCI 325 : High Performance Computing', 'CSCI 330 : Mobile Computing',
'CSCI 331 : Advanced Mobile Computing', 'CSCI 336 : Ubiquity and Sensing', 'Back'
]

const initList = ['Core courses info', 'Other CS Courses', 'Non-CS Technical electives', 'Natural science electives', 'Back']

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
exports.courseKeyboard = courseKeyboard;
exports.getCurrentCode = getCurrentCode; exports.getCurrentCourse = getCurrentCourse;