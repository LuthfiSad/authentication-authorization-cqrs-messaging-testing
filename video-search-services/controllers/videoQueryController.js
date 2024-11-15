import * as videoService from '../services/videoQueryService.js';

export const searchVideos = async (req, res) => {
  try {
    const results = await videoService.searchVideos(req.query.search_query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVideoById = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await videoService.searchById(id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
