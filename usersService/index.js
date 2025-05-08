const express = require("express")
const cors = require("cors")
const userRouter = require("./routers/userRouter")

const app = express()

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]

}));

app.use('/api', userRouter)

app.listen(3000, () => console.log("Service running in port 3000"))