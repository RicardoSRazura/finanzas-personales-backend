import { pool } from "../db.js"

export const getCuenta = async (req, res) => {
    try{
        const userId = req.user.idusuario
        const result = await pool.query('SELECT * FROM cuenta WHERE idusuario = $1', [userId]);
        const cuentas = result.rows

        res.status(200).json(cuentas);
    }catch (error){
        console.error('Hubo un error al obtener las cuentas', error);
        res.status(500).json({message: 'Hubo un error al obtener la cuentas'});

    }
}

export const getTransaccion = async (req, res) => {
    try{
        const cuentaId = req.user.idcuenta
        const query = 'SELECT * FROM transaccion WHERE idcuenta = $1'
        const {rows} = await pool.query(query, [cuentaId]);
        res.status(200).json(rows);
    }catch (error){
        console.error('Hubo un error al obtener las transacciones del usuario', error);
        res.status(500).json({message: 'Hubo un error al obtener la transacciones'});

    }
}