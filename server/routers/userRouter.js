import { updateUser, updateUserImage } from '../controllers/userController.js';
import express from 'express';
import { authorizePage } from '../middlewares/authorizePage.js';

const router = express.Router();

router.post('/update', authorizePage, async (req, res) => {
  const response = await updateUser(req.user.id, req.body);
  res.json(response);
});

router.post('/update/image', authorizePage, async (req, res) => {
  const { imageUrl } = req.body;
  if (imageUrl == null) return res.sendStatus(400);

  const response = await updateUserImage(req.user.id, imageUrl);
  res.json(response);
});

export default router;
