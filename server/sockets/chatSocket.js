import { Server } from 'socket.io';
import { addMessage } from '../controllers/chatController.js';

export const useChatSocket = (httpServer) => {
  const io = new Server(httpServer, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('User connected ', socket.id);

    socket.on('send-message', (message) => {
      console.log('Message sent from client', message);

      addMessage(message);

      socket.broadcast.emit('receive-message', message);
    });
  });
};
