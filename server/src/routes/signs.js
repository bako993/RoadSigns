import express from 'express';
import uploadFile from '../middlewares/upload_handler.js';
import { getAllSigns, getSignById, uploadSign, updateSign, deleteSign } from '../controllers/signs.js';
import { authenticateToken } from '../middlewares/auth_token.js';

const router = express.Router();

// router.get('/', authenticateToken, getAllSigns);
// router.get('/:id', authenticateToken, getSignById);
// router.post('/', uploadFile, uploadSign);
// router.put('/:id', authenticateToken, updateSign);
// router.delete('/:id', authenticateToken, deleteSign);

router.get('/', getAllSigns);
router.get('/:id', getSignById);
router.post('/', uploadFile, uploadSign);
router.put('/:id', updateSign);
router.delete('/:id', deleteSign);
export default router;