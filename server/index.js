import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { useChatSocket } from './sockets/chatSocket.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);

useChatSocket(httpServer);

import chatRouter from './routers/chatRouter.js';
app.use('/chat', chatRouter);

import userRouter from './routers/userRouter.js';
app.use('/user', userRouter);

const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
