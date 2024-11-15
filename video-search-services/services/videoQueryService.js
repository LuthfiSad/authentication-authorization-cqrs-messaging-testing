import * as videoRepository from '../repositories/videoQueryRepository.js';

export const searchVideos = async (query) => {
  return await videoRepository.search(query);
  // return await videoRepository.searchByTitleForRecommendation(query);
};

export const searchById = async (id) => {
  return await videoRepository.searchById(id);
};
