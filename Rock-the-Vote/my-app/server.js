const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')


// Middleware

app.use(express.json())
app.use(morgan('dev'))

// Connect to DB

mongoose.connect('mongodb://localhost:27017/inventorydb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  },
  () => console.log("Connected to the DB")
)

// Routes
app.use("/auth", require("./routes/authRouter.js"))
app.use('/api', expressJwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use("/api/issue", require("./routes/issueRouter.js"))
app.use("/api/comment", require("./routes/commentRouter.js"))


// ERROR HANDLER

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "Unauthorized Error"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})


app.listen(8000, () => {
    console.log("This server is running on Port 8000")
})