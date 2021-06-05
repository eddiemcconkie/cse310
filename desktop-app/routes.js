const express = require("express")
const controller = require("./controller")
const router = express.Router()

router.get('/class/:classId/qr-code', controller.getQR)
      .get('/add-class', controller.getAddClass)
      .post('/add-class', controller.postAddClass)
      .post('/edit-class-view', controller.getEditClass)
      .post('/edit-class', controller.postEditClass)
      .get('/', controller.getHomepage)

module.exports = router
