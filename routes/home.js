const express = require('express')
const router = express.Router()

const {home} = require("../controllers/home")

router.route("/home").get(home)

module.exports = router