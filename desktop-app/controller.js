const fs = require("fs")
const path = require("path")

function readClassFile(cb) {
    fs.readFile(path.join(__dirname,'data','classes.json'), (err, data) => {
        if (err) return console.log(err)
        cb(JSON.parse(data))
    })
}

exports.getHomepage = (req, res, next) => {
    readClassFile(classData => {
        res.render('pages/index.ejs', {
            classes: classData
        })
    })
}

exports.getEditClass = (req, res, next) => {

}

exports.getAddClass = (req, res, next) => {
    res.render('pages/class-details-form.ejs', {
        editing: false
    })
}

exports.postAddClass = (req, res, next) => {
    readClassFile(data => {
        const courseData = {
            name: req.body.className,
            times: {
                days: [
                    req.body.Monday,
                    req.body.Tuesday,
                    req.body.Wednesday,
                    req.body.Thursday,
                    req.body.Friday
                ],
                times: [req.body.classStartTime, req.body.classEndTime]
            },
            id: req.body.className.toLowerCase().replace(/\ /g, '')+req.body.classSemester+(new Date().getFullYear().toString())+"s"+req.body.classSection
        }

        const courses = [...data]
        courses.push(courseData)

        fs.writeFile(path.join(__dirname,'data','classes.json'), JSON.stringify(courses), (err) => {
            if (err) console.log("ERROR:", err)
            else res.redirect('/')
        })
    })
}


exports.getQR = (req, res, next) => {
    res.render('pages/qr-code.ejs', {
        codeForQR: req.params.classId
    })
}

exports.getCreatePoll = (req, res, next) => {
    res.render('pages/create-poll.ejs', {
        // editing: false
    })
}

exports.postCreatePoll = (req, res, next) => {
    console.log(req.body.json);
}
