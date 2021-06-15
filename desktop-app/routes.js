const express = require("express")
const controller = require("./controller")
const router = express.Router()

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

module.exports = router
