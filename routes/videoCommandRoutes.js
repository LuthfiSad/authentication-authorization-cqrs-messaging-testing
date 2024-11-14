import express from 'express';
import * as commandController from '../controllers/videoCommandController.js';
import { validateCreateVideoInput, validateUpdateVideoInput } from '../middlewares/validateVideoInput.js';

const commandRouter = express.Router();

commandRouter.post('/videos', validateCreateVideoInput, commandController.createVideo);
commandRouter.put('/videos/:id', validateUpdateVideoInput, commandController.updateVideo);
commandRouter.delete('/videos/:id', commandController.deleteVideo);

export default commandRouter;
