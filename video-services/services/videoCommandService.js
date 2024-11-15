import videoRepository from '../repositories/videoCommandRepository.js';
import axios from 'axios';

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

export const searchById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3002/api/query/videos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error querying Query Service:", error.message);
    return null;
  }
};