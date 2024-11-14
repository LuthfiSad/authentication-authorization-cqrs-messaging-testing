import { searchById } from "../repositories/videoQueryRepository.js";

export const validateCreateVideoInput = (req, res, next) => {
  const { title, description, thumbnail_url, video_url, category, uploader } = req.body;

  if (!title || !description || !thumbnail_url || !video_url || !category || !uploader) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  next();
};

export const validateUpdateVideoInput = async (req, res, next) => {
  const { title, description, category } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  const video = await searchById(id)
  
  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  if (!title && !description && !category) {
    return res.status(400).json({ error: 'At least one field is required' });
  }

  next();
}