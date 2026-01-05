import express from 'express';
const app = express();
import EngineRouter from './engineApi/EngineRouter.js';
import './dbClass/dbClass.js'; // Initialize MongoDB connection
app.use(express.json());
app.get('/', (req, res) => {
    res.send('🚀 Server is running');
});

// mount router
app.use('/engine', EngineRouter);

// start server
app.listen(3000, () => {
    console.log('🚀 Server listening on port 3000');
});