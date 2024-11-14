import db from '../db/postgres.js';
import { v4 as uuidv4 } from 'uuid';
import elasticClient from '../elastic/elasticClient.js';

const create = async (videoData) => {
  const id = uuidv4();
  await db.none(
    'INSERT INTO videos (id, title, description, thumbnail_url, video_url, category, uploader) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [id, videoData.title, videoData.description, videoData.thumbnailUrl, videoData.videoUrl, videoData.category, videoData.uploader]
  );

  try {
    const response = await elasticClient.index({
      index: 'videos',
      id,
      document: { ...videoData, id, views: 0, likes: 0, upload_date: new Date() }
    });
    console.log('Elasticsearch response:', response);
  } catch (error) {
    console.error('Elasticsearch error:', error);
  }

  return { id };
};

const update = async (id, videoData) => {
  await db.none(
    'UPDATE videos SET title = $1, description = $2, category = $3 WHERE id = $4',
    [videoData.title, videoData.description, videoData.category, id]
  );

  try {
    await elasticClient.update({
      index: 'videos',
      id,
      doc: videoData
    });
    console.log('Elasticsearch response:', response);
  } catch (error) {
    console.error('Elasticsearch error:', error);
  }
};

const remove = async (id) => {
  await db.none('DELETE FROM videos WHERE id = $1', [id]);
  try {
    await elasticClient.delete({ index: 'videos', id });
  } catch (error) {
    console.error('Elasticsearch error:', error);
  }

};

export default { create, update, remove };
