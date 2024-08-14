import { pool } from '../db.js'


export const buscarIdUsuario = async (userId) => {
    try {
        const query = 'SELECT idusuario FROM usuario WHERE idusuario = $1';
        const busqueda = await pool.query(query, [userId]);
        if (busqueda.rows.length === 0) {
            return null;
        }

        return busqueda.rows[0].idusuario;
    }catch (error) {
        console.error('Error al econtrar el ID', error);
    }
}

export const buscarIdCuenta = async (idCuenta) => {
    try {
        const query = 'SELECT idcuenta FROM cuenta WHERE idcuenta = $1';
        const busqueda = await pool.query(query, [idCuenta]);
        if (busqueda.rows.length === 0) {
            return null;
        }

        return busqueda.rows[0].idcuenta;
    }catch (error) {
        console.error('Error al econtrar el ID', error);
    }
}

export const buscarIdTransaccion = async (idTransaccion) => {
    try {
        const query = 'SELECT idtransaccion FROM transaccion WHERE idtransaccion = $1';
        const busqueda = await pool.query(query, [idTransaccion]);
        if (busqueda.rows.length === 0) {
            return null;
        }

        return busqueda.rows[0].idtransaccion;
    }catch (error) {
        console.error('Error al econtrar el ID', error);
    }
}
