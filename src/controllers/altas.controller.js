import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";



export const createAccount = async (req, res) => {
    const userId = req.user.idusuario;
    console.log(userId)
    const { tipoCuenta, saldoInicial } = req.body;
    const fechaApertura = new Date();

    try{
        const query = "INSERT INTO cuenta (idusuario, tipocuenta, saldo, fechaapertura) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [userId, tipoCuenta, saldoInicial, fechaApertura];
        const result = await pool.query(query, values);

        //Obetener el idcuenta de la cuenta recien creada
        const newAccountId = result.rows[0].idcuenta;

        //Crer el token con el idusuario y el idcuenta
        const tokenPayload = {idusuario: userId, idcuenta: newAccountId};
        const token = await createAccessToken(tokenPayload)

        res.cookie('token', token);

        res.status(201).json({
            message:'Cuenta creada exitosamente',
            account: result.rows[0]
        });
    }catch (error){
        console.error('Error al crear la cuenta:', error);
        res.status(500).json({message: 'Error interno del servidor'});
    }
}

export const createTransaccion = async (req, res) => {
    const cuentaId = req.body.idcuenta;
    console.log(cuentaId)
    const userId = req.user.idusuario
    const {tipoTransaccion, cantidad} = req.body;
    const fecha = new Date();

    try{

        await pool.query('BEGIN');

        const query = "INSERT INTO transaccion (idcuenta, tipotransaccion, cantidad, fecha) VALUES ($1, $2, $3, $4) RETURNING *"
        const values = [cuentaId, tipoTransaccion, cantidad, fecha];
        const result = await pool.query(query, values);

        const newTransactionId = result.rows[0].idtransaccion;

        const updateSaldoQuery = "UPDATE cuenta SET saldo = saldo - $1 WHERE idcuenta = $2";
        const updateSaldoValues = [cantidad, cuentaId];
        await pool.query(updateSaldoQuery, updateSaldoValues);

        await pool.query('COMMIT');
        
        const tokenPayload = {idusuario: userId ,idcuenta: cuentaId, idtransaccion: newTransactionId};
        const token = await createAccessToken(tokenPayload);

        res.cookie('token', token);

        res.status(201).json({
            message: 'Tu transaccion fue agregada correctamente',
            transaccion: result.rows[0]
        });

    }catch(error){
        console.error('Error al agregar la transaccion:', error);
        res.status(500).json({message: 'Error interno del servidor'});

    }
}

export const createMetaAhorro = async (req, res) => {
    const userId = req.user.idusuario
    const {categoria, objetivo} = req.body;
    

    try{
        const query = "INSERT INTO metaahorro (idusuario, categoria, objetivo) VALUES ($1, $2, $3) RETURNING *"
        const values = [userId, categoria, objetivo];
        const result = await pool.query(query, values);

        res.status(201).json({
            message: 'Tu meta de ahorro fue agregada correctamente',
            MetaDeAhorro: result.rows[0]
        });

    }catch(error){
        console.error('Error al agregar la transaccion:', error);
        res.status(500).json({message: 'Error interno del servidor'});

    }
}

export const createPresupuesto = async (req, res) => {
    const userId = req.user.idusuario
    const {categoria, limite} = req.body;

    try{
        const query = "INSERT INTO presupuesto (idusuario, categoria, limite) VALUES ($1, $2, $3) RETURNING *"
        const values = [userId, categoria, limite];
        const result = await pool.query(query, values);

        res.status(201).json({
            message: 'Tu presupuesto fue establecido correctamente',
            Presupuesto: result.rows[0]
        });

    }catch(error){
        console.error('Error al agregar la transaccion:', error);
        res.status(500).json({message: 'Error interno del servidor'});

    }
}