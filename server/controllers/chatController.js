import { prisma } from '../utils/prisma.js';

export const getAllMessages = async () => {
  const messages = await prisma.message.findMany();
  return messages;
};

export const getLastMessages = async (number) => {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
    take: number,
  });

  return messages.reverse();
};

export const addMessage = async (message) => {
  const response = await prisma.message.create({ data: message });
  return response;
};
