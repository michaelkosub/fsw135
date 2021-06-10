const express = require("express")
const app = express()
const morgan = require("morgan")



app.use(express.json())
app.use(morgan('dev'))


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/inventorydb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("Connected to the DB")
)


app.use("/inventory", require("./models/inventory"))



app.get('/',(err,  res, ) => {
   
  res.send("Hello World")
})



app.listen(7000, () => {
    console.log("The App is listening on Port 7000")
})