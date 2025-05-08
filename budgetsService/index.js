const express = require('express');
const budgetRouter = require('./routers/budgetRouter');

const app = express();

app.use(express.json());

app.use('/api/budget', budgetRouter);

app.listen(3001, () => console.log('Service running in port 3001'));