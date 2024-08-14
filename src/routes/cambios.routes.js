import {Router} from 'express'
import {authRequired} from '../middlewares/validateTokens.js';
import { changeAccount } from '../controllers/cambios.controller.js';


const router = Router();

router.put('/profile/update/:id', authRequired, changeAccount);

// router.put('/profile/cuenta-changes', authRequired, );


export default router;