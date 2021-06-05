const express = require("express")
const controller = require("./controller")
const router = express.Router()

router.get('/class/:classId/qr-code', controller.getQR)
      .get('/add-class', controller.getAddClass)
      .post('/add-class', controller.postAddClass)
      .get('/', controller.getHomepage)
      .get('/create-poll', controller.getCreatePoll)
      .post('/create-poll', controller.postCreatePoll)

module.exports = router
