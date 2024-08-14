import {Router} from 'express'
import {authRequired} from '../middlewares/validateTokens.js';
import { getCuenta, getTransaccion } from '../controllers/consultas.controller.js';

const router = Router();

router.get('/profile/getcuenta', authRequired, getCuenta);

router.get('/profile/gettransaccion', authRequired, getTransaccion);



export default router;