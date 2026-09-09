import express from 'express';
import {
  sendMessage,
  getMessages,
  deleteMessage,
} from '../controllers/messageController.js';

const router = express.Router();

router.route('/').post(sendMessage).get(getMessages);
router.route('/:id').delete(deleteMessage);

export default router;
