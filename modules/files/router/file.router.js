// file.router.js
import express from 'express';
const router = express.Router();
import AuthMiddleWare from '../../../middleware/auth.middleware.js';

import FileController from '../controller/file.controller.js';
import { uploadLimiter, downloadLimiter } from '../../../config/rate-limit.js';
import multer from 'multer';

const fileController = new FileController();

// Middleware for handling multipart/form-data
const upload = new multer();

// File routes
router.post('', uploadLimiter, AuthMiddleWare, upload.single('file'), fileController.uploadFile);
router.delete('/:privateKey', AuthMiddleWare, fileController.deleteFileByPrivateKey);
router.get('/:publicKey', downloadLimiter, fileController.getFileByPublicKey);

export default router;