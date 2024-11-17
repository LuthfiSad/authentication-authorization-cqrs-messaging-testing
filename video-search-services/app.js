import express from 'express';
import queryRouter from './routes/videoQueryRoutes.js';
import { consumeQueue } from './messages/rabbitmqClient.js';

const app = express();
app.use(express.json());
const INTERNAL_API_KEY = "gateway-secret-key";

app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  const dataAuth = req.headers["authorization"];
  
  if (apiKey !== INTERNAL_API_KEY || !dataAuth) {
      return res.status(403).json({ message: "Forbidden" });
  }
  next();
});

app.use('/api/query', queryRouter);

consumeQueue().catch(console.error);

app.listen(3002, () => {
  console.log('Query Service running on http://localhost:3002');
});
