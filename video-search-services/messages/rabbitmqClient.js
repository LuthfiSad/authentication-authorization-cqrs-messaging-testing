import amqp from 'amqplib';

import { handleMessage } from '../repositories/videoQueryRepository.js';

export async function consumeQueue() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'video_updates';

  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const message = JSON.parse(msg.content.toString());
      await handleMessage(message);
      channel.ack(msg);
    }
  });
}
