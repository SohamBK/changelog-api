import express from "express";
import router from "./router"
import morgan from "morgan";
import cors from "cors";
import {protect} from "./modules/auth";
import { setMaxIdleHTTPParsers } from "http";
import { createNewUser, signin } from "./handlers/user";

const app = express()

// const customLogger = (message) => (req, res, next) => {
//     console.log(`Hello form ${message}`)
//     next()
// }

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//app.use(customLogger("custom logger"))
// app.use((req, res, next) =>{
//     res.status(401)
//     res.send("Nope")
//     next()
// })

app.get("/", (req, res) => {
    throw new Error("hello")
})

app.use("/api", protect, router)

app.post("/user", createNewUser)
app.post("/signin", signin)

app.use((err, req, res, next) => {
    console.log(err)
    res.json({message: "oops ther was an error"})
})

export default app;