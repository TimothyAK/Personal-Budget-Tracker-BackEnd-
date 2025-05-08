const express = require('express');
const cors = require('cors');
const budgetRouter = require('./routers/budgetRouter');

const app = express();
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]

}));

app.use(express.json());

app.use('/api/budget', budgetRouter);

app.listen(3001, () => console.log('Service running in port 3001'));