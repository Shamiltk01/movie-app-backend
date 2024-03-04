const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter=require("./controllers/userRouter")

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://shamiltk02:shamiltk98@cluster0.7syqm.mongodb.net/MovieUserDb?retryWrites=true&w=majority", { useNewUrlParser: true })

app.use("/user",userRouter)


app.listen(3001, () => {
    console.log("server is running..")
})