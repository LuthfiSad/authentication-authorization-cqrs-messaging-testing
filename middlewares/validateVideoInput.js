export const validateVideoInput = (req, res, next) => {
  const { title, description, thumbnailUrl, videoUrl, category, uploader } = req.body;

  if (!title || !description || !thumbnailUrl || !videoUrl || !category || !uploader) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  next();
};
