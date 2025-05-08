const express = require('express');
const expenseRouter = require('./routers/expenseRouter');

const app = express();

app.use(express.json());

app.use("/api", expenseRouter);

app.listen(3003, () => console.log("Service running in port 3003"));