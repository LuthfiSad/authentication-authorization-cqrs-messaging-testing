import db from '../db/postgres.js';
import { v4 as uuidv4 } from 'uuid';
import { sendToQueue } from '../messages/rabbitmqClient.js';

const get = async () => {
  const result = await db.any('SELECT * FROM videos');
  return result;
};

const create = async (videoData) => {
  const id = uuidv4();
  await db.none(
    'INSERT INTO videos (id, title, description, thumbnail_url, video_url, category, uploader) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [id, videoData.title, videoData.description, videoData.thumbnailUrl, videoData.videoUrl, videoData.category, videoData.uploader]
  );

  const message = { action: 'CREATE', data: { ...videoData, id, views: 0, likes: 0, uploadDate: new Date() } };
  await sendToQueue('video_updates', message);

  return { id };
};

const update = async (id, videoData) => {
  await db.none(
    'UPDATE videos SET title = $1, description = $2, category = $3 WHERE id = $4',
    [videoData.title, videoData.description, videoData.category, id]
  );

  const message = { action: 'UPDATE', data: { id, ...videoData } };
  await sendToQueue('video_updates', message);
};

const remove = async (id) => {
  await db.none('DELETE FROM videos WHERE id = $1', [id]);
  
  const message = { action: 'DELETE', data: { id } };
  await sendToQueue('video_updates', message);
};

export default { create, update, remove, get };
