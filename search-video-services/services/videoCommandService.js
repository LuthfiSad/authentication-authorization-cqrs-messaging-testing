import videoRepository from '../repositories/videoCommandRepository.js';

export const getVideos = async () => {
  return await videoRepository.get();
}

export const createVideo = async (videoData) => {
  return await videoRepository.create(videoData);
};

export const updateVideo = async (id, videoData) => {
  return await videoRepository.update(id, videoData);
};

export const deleteVideo = async (id) => {
  return await videoRepository.remove(id);
};
