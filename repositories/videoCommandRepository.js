import db from '../db/postgres.js';
import { v4 as uuidv4 } from 'uuid';
import client from '../elastic/elasticClient.js';

const create = async (videoData) => {
  const id = uuidv4();
  await db.none(
    'INSERT INTO videos (id, title, description, thumbnail_url, video_url, category, uploader) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [id, videoData.title, videoData.description, videoData.thumbnailUrl, videoData.videoUrl, videoData.category, videoData.uploader]
  );

  await client.index({
    index: 'videos',
    id,
    document: { ...videoData, id, views: 0, likes: 0, upload_date: new Date() }
  });

  return { id };
};

const update = async (id, videoData) => {
  await db.none(
    'UPDATE videos SET title = $1, description = $2, category = $3 WHERE id = $4',
    [videoData.title, videoData.description, videoData.category, id]
  );

  await client.update({
    index: 'videos',
    id,
    doc: videoData
  });
};

const remove = async (id) => {
  await db.none('DELETE FROM videos WHERE id = $1', [id]);
  await client.delete({ index: 'videos', id });
};

export default { create, update, remove };
