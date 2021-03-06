const fs = require("fs")
const path = require("path")
const {ipcRenderer} = require('electron');
const classDataFilePath = path.join(__dirname,'data','classes.json')

function readClassFile(cb) {
    fs.readFile(classDataFilePath, (err, data) => {
        if (err) return console.log(err)
        cb(JSON.parse(data))
    })
}

exports.getHomepage = (req, res, next) => {
    readClassFile(classData => {
        res.render('pages/index', {
            classes: classData,
            showBackIcon: false
        })
    })
}

exports.getEditClass = (req, res, next) => {
    readClassFile(classData => {
        const editClass = classData.filter(singleClass => {
            return singleClass.id === req.body.editClassId
        })
        res.render('pages/class-details-form', {
            editing: true,
            classData: editClass[0]
        })
    })
}

exports.postEditClass = (req, res, next) => {
    readClassFile(classData => {
        const days = [req.body.Monday,req.body.Tuesday,req.body.Wednesday,req.body.Thursday,req.body.Friday]
        let allClasses = [...classData]
        const classIndex = classData.map((singleClass, index) => {
            return {prevIndex: index, id: singleClass.id}
        }).filter(elements => {
            return elements.id === req.body.editedClassId
        })[0].prevIndex

        allClasses[classIndex].name = req.body.className
        allClasses[classIndex].days = days.filter(day => day)
        allClasses[classIndex].times = [req.body.classStartTime, req.body.classEndTime]
        allClasses[classIndex].semester = req.body.classSemester
        allClasses[classIndex].section = req.body.classSection


        fs.writeFile(classDataFilePath, JSON.stringify(allClasses), (err) => {
            if (err) console.log(err)
            else res.redirect('/')
        })
    })
}

exports.getAddClass = (req, res, next) => {
    res.render('pages/class-details-form', {
        editing: false
    })
}

exports.postAddClass = (req, res, next) => {
    readClassFile(data => {
        const days = [req.body.Monday,req.body.Tuesday,req.body.Wednesday,req.body.Thursday,req.body.Friday]
        const courseData = {
            name: req.body.className,
            days: days.filter(day => day),
            times: [req.body.classStartTime, req.body.classEndTime],
            semester: req.body.classSemester,
            section: req.body.classSection,
            id: req.body.className.toLowerCase().replace(/\ /g, '')+req.body.classSemester.toLowerCase()+(new Date().getFullYear().toString())+"s"+req.body.classSection
        }

        const courses = [...data]
        courses.push(courseData)

        fs.writeFile(classDataFilePath, JSON.stringify(courses), (err) => {
            if (err) console.log(err)
            else res.redirect('/')
        })
    })
}


exports.getQR = (req, res, next) => {
    const classId = req.params.classId;
    const filepath = path.join(__dirname, 'data', 'classes.json');
    const allClassData = JSON.parse(fs.readFileSync(filepath));
    const selectedClassData = allClassData.find(cls => cls.id == classId);
    const port = process.env.PORT || 3000;
    // selectedClassData.ip = "http://"+require("ip").address()+":"+port;
    selectedClassData.ip = require("ip").address()+":"+port;
    // selectedClassData.other = "OTHER";
    console.log(selectedClassData)
    // console.log(selectedClassData);
    res.render('pages/qr-code', {
        // codeForQR: req.params.classId
        // codeForQR: JSON.stringify("<%-selectedClassData %>"),
        codeForQR: JSON.stringify(selectedClassData)
    })
}

exports.getDemoQR = (req, res, next) => {
    res.render('pages/qr-code', {
        codeForQR: "https://"+require("ip").address()+":8000"
    })
}

exports.getTestServer = (req, res, next) => {
    res.render('pages/server-test', {});
}

exports.postSendMessage = (req, res, next) => {
    let msg = req.body.msg;
    // console.log(msg);
    res.redirect('/', msg);
}

exports.getCreatePoll = (req, res, next) => {
    res.render('pages/create-poll', {})
}

exports.postCreatePoll = (req, res, next) => {
    // console.log(req.body.json);
    // res.render('pages/poll-results');
    // ipcRenderer.send('post-poll', req.body.json);
}
