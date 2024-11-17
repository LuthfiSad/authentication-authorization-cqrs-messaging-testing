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

export const searchById = async (id, req) => {
  try {
    console.log(req.headers);
    
    const response = await axios.get(`http://localhost:3005/videos/${id}`, {
      headers: {
        "authorization": req.headers.authorization
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error querying Query Service:", error.message);
    return null;
  }
};