import express from 'express';
import commandRouter from './routes/videoCommandRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/command', commandRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
