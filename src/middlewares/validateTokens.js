import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js'
import { buscarIdUsuario, buscarIdTransaccion, buscarIdCuenta } from '../libs/findById.js';

export const authRequired = (req, res, next) => {
    const {token} = req.cookies;
    if(!token) return res.status(401).json({message: "No token, authorization deniend"});
    
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(403).json({message: "Invalid token"});

        try{
            const userId = user.idusuario;
            const accountId = user.idcuenta;
            const transactionId = user.idtransaccion;

            // const usuario = await buscarIdUsuario(userId);
            // const cuenta = await buscarIdCuenta(accountId);
            // const transaccion = await buscarIdTransaccion(transactionId);

            req.user = {
                idusuario: userId,
                idcuenta: accountId,
                idtransaccion: transactionId,
            };

            next();

        } catch (error){
            console.error('Error al buscar IDs y datos adicionales:', error);
            return res.status(500).json({message: 'Error interno del servidor'});
        }
        
    })

}