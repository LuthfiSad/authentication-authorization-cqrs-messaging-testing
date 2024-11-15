import express from 'express';
import queryRouter from './routes/videoQueryRoutes.js';
import { consumeQueue } from '../messages/rabbitmqClient.js';

const app = express();
app.use(express.json());
app.use('/api/query', queryRouter);

consumeQueue().catch(console.error);

app.listen(3002, () => {
  console.log('Query Service running on http://localhost:3002');
});
