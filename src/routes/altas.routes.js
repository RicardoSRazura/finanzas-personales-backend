import {Router} from 'express'
import {authRequired} from '../middlewares/validateTokens.js';
import { createAccount, createTransaccion, createMetaAhorro, createPresupuesto } from '../controllers/altas.controller.js';

const router = Router();

router.post('/profile/cuentas', authRequired, createAccount);

router.post('/profile/transaccion', authRequired, createTransaccion);

router.post('/profile/meta-ahorro', authRequired, createMetaAhorro);

router.post('/profile/presupuesto', authRequired, createPresupuesto);

export default router;