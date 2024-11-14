import * as videoService from '../services/videoQueryService.js';

export const searchVideos = async (req, res) => {
  try {
    const results = await videoService.searchVideos(req.query.q);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
