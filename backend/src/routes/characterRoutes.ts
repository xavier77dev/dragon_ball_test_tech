import { Router } from 'express';
import { createCharacter, deleteCharacter, getDetailIdCharacter, getUserCharacters, getUserNameOwner, putCharacter, syncCharacters } from '../controllers/characterController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createCharacter);
router.get('/', authenticate, getUserCharacters);
router.put("/:id", authenticate, putCharacter);
router.delete("/:id", authenticate, deleteCharacter);

router.get("/detail/:id", authenticate, getDetailIdCharacter);
router.get('/sync', authenticate, syncCharacters);
router.get('/username-owner', authenticate, getUserNameOwner);

export default router;
