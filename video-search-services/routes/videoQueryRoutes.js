import express from 'express';
import * as queryController from '../controllers/videoQueryController.js';

const queryRouter = express.Router();

queryRouter.get('/videos/search', queryController.searchVideos);

export default queryRouter;
