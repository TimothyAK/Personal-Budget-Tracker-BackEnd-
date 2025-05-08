const express = require("express")
const userRouter = require("./routers/userRouter")

const app = express()

app.use(express.json());

app.use('/api', userRouter)

app.listen(3000, () => console.log("Service running in port 3000"))