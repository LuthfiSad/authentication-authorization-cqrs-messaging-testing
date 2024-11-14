import * as videoService from '../services/videoCommandService.js';

export const createVideo = async (req, res) => {
  try {
    const video = await videoService.createVideo(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateVideo = async (req, res) => {
  try {
    await videoService.updateVideo(req.params.id, req.body);
    res.status(200).json({ message: 'Video updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    await videoService.deleteVideo(req.params.id);
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
