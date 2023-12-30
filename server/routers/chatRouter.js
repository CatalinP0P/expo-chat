import express from 'express';
import {
  addMessage,
  getAllMessages,
  getLastMessages,
} from '../controllers/chatController.js';
const router = express.Router();
import { authorizePage } from '../middlewares/authorizePage.js';

router.get('/', async (req, res) => {
  res.json(await getAllMessages());
});

router.get('/:number', authorizePage, async (req, res) => {
  const number = parseInt(req.params.number);
  const messages = await getLastMessages(number);
  res.json(messages);
});

router.post('/', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await addMessage(message);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.json({});
  }
});

export default router;
