import { pool } from '../db.js'


export const buscarUsuario = async (usernameOrEmail) => {
    try {
        const query = 'SELECT * FROM usuario WHERE nombre = $1 OR email = $1'
        const busqueda = await pool.query(query, [usernameOrEmail]);

        return busqueda.rows[0];
    }catch (error) {
        console.error('Error al econtrar el usuario', error);
    }
}

export const buscarIdUsuario = async (userId) => {
    try {
        const query = 'SELECT * FROM usuario WHERE idusuario = $1';
        const busqueda = await pool.query(query, [userId]);
        if (busqueda.rows.length === 0) {
            return null;
        }

        return busqueda.rows[0];
    }catch (error) {
        console.error('Error al econtrar el ID', error);
    }
}