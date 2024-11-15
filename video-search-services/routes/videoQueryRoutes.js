import express from 'express';
import * as queryController from '../controllers/videoQueryController.js';

const queryRouter = express.Router();

queryRouter.get('/videos/search', queryController.searchVideos);
queryRouter.get('/videos/:id', queryController.getVideoById);

export default queryRouter;
