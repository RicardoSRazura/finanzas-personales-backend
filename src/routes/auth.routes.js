import {Router} from 'express';
import { register } from '../controllers/register.controller.js';
import { login } from '../controllers/login.controller.js';
import { logout } from '../controllers/logout.controller.js';
import { profile } from '../controllers/profile.controller.js';
import { verifyToken } from '../controllers/verify.controller.js';
import { authRequired } from '../middlewares/validateTokens.js'
import {validateSchema} from '../middlewares/validator.middleware.js'
import { registerSchema, loginSchema } from '../schemas/auth.schemas.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.post('/logout', logout);

router.get('/verify', verifyToken);

router.get('/profile', authRequired, profile);

export default router;