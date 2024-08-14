import { pool } from "../db.js";

export const deleteAccount = async (req, res) => {
    const idCuenta = req.params.id
    try{
        const result =  await pool.query('DELETE FROM cuenta WHERE idcuenta = $1', [idCuenta]);
        res.status(200).json({message: 'Cuenta eliminada correctamente'});

    }catch(error){
        console.error('Error al eliminar cuenta:', error);
        res.status(500).json({ error: 'Error interno del servidor'});

    }
}

export const deleteTransaccion = async (req, res) => {
    const idTransaction = req.params.id;

    try{
        const result = await pool.query('DELETE FROM transaccion WHERE idtransaccion = $1', [idTransaction]);
        res.status(200).json({message: 'Transaccion eliminada correctamente'});

    } catch(error){
        console.error('Error al eliminar transaccion:', error);
        res.status(500).json({ error: 'Error interno del servidor'});

    }
}

export const deleteMetaAhorro = async (req, res) => {
    const idMetaAhorro = req.params.id   

    try{
        const result = await pool.query('DELETE FROM metaahorro WHERE idmetaahorro = $1', [idMetaAhorro]);
        res.status(200).json({ message: 'Meta de ahorro eliminada correctamente'});

    }catch(error){
        console.error('Error al eliminar la meta de ahorro:', error);
        res.status(500).json({message: 'Error interno del servidor'});
    }
}

export const deletePresupuesto = async (req, res) => {
    const idPresupuesto = req.params.id

    try{
        const result = await pool.query('DELETE FROM presupuesto WHERE idpresupuesto = $1', [idPresupuesto]);
        res.status(200).json({ message: 'Presupuesto eliminado correctamente'});

    }catch(error){
        console.error('Error al eliminar el presupuesto:', error);
        res.status(500).json({message: 'Error interno del servidor'});
    }
}
