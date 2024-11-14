import * as videoRepository from '../repositories/videoQueryRepository.js';

export const searchVideos = async (query) => {
  return await videoRepository.search(query);
};
