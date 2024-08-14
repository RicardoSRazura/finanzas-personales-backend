import {Router} from 'express'
import {authRequired} from '../middlewares/validateTokens.js';
import { deleteAccount, deleteMetaAhorro, deletePresupuesto, deleteTransaccion } from '../controllers/bajas.controller.js';


const router = Router();

router.delete('/profile/delete-cuenta/:id', authRequired, deleteAccount);

router.delete('/profile/delete-transaccion/:id', authRequired, deleteTransaccion);

router.delete('/profile/delete-metaahorro/:id', authRequired, deleteMetaAhorro);

router.delete('/profile/delete-presupuesto/:id', authRequired, deletePresupuesto);

export default router;