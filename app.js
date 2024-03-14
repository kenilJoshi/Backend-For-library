const express = require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const home = require("./routes/home")
const user = require("./routes/user")
const book = require("./routes/book")

app.use("/api/v1", home)
app.use("/api/v1",user)
app.use("/api/v1", book)


module.exports = app