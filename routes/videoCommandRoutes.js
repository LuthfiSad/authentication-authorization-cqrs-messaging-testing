import express from 'express';
import * as commandController from '../controllers/videoCommandController.js';
import { validateVideoInput } from '../middlewares/validateVideoInput.js';

const commandRouter = express.Router();

commandRouter.post('/videos', validateVideoInput, commandController.createVideo);
commandRouter.put('/videos/:id', validateVideoInput, commandController.updateVideo);
commandRouter.delete('/videos/:id', commandController.deleteVideo);

export default commandRouter;
