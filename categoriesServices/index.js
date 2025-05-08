const express = require('express');
const categoryRouter = require('./routers/categoryRouter');

const app = express();

app.use(express.json());

app.use('/api', categoryRouter);

app.listen(3002, () => console.log('Service running in port 3002'));
