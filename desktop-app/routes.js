const express = require("express")
const controller = require("./controller")
const router = express.Router()
const path = require("path")
const fs = require("fs")

const suggestionFilePath = path.join(__dirname, 'data', 'possibleNames.json')

router.get('/class/:classId/qr-code', controller.getQR)
      .get('/demo-qr-display', controller.getDemoQR)
      .get('/add-class', controller.getAddClass)
      .post('/add-class', controller.postAddClass)
      .post('/edit-class-view', controller.getEditClass)
      .post('/edit-class', controller.postEditClass)
      .get('/', controller.getHomepage)
      .get('/test-server', controller.getTestServer)
      .post('/send-message', controller.postSendMessage)
      .get('/', controller.getHomepage)
      .get('/create-poll', controller.getCreatePoll)
      .post('/create-poll', controller.postCreatePoll)
      .post('/final-poll-results', (req, res, next) => {
            const newSuggestion = req.body.appNameSuggestion

            fs.readFile(suggestionFilePath, (err, file) => {
                if (err) return console.log(err)

                let suggestions = JSON.parse(file)
                suggestions.push(newSuggestion)

                fs.writeFile(suggestionFilePath, JSON.stringify(suggestions), (err) => {
                    if (err) return console.log(err)})
            })
                
        })

module.exports = router
