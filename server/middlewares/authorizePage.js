import { getUser } from '../controllers/userController.js';
import clerk from '../utils/clerk.js';

export const authorizePage = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader == null) return res.status(401).json('No auth token proided');
  const token = authHeader.split(' ')[1];
  if (token == null) {
    return res.status(403).json('Auth token not valid');
  }
  try {
    const decodedToken = await clerk.verifyToken(token);
    const id = decodedToken.sub;

    const user = await getUser(id);
    req.user = user;

    next();
  } catch (err) {
    console.log('Error middleware', err);
    return res.status(403).json('Auth token not valid');
  }
};
