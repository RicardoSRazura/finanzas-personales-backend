import { pool } from "../db.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";

export const changeAccount = async (req, res) => {
    const {newName, newPassword, newBalance } = req.body;
    const userId = req.params.id
    console.log(userId, newName, newPassword)
    try {
        const passwordHash = await bcrypt.hash(newPassword, 10);
        if (newName || passwordHash) {
            await pool.query('UPDATE usuario SET nombre = $1, contrasena = $2 WHERE idusuario = $3', [newName, passwordHash, userId]);
        }
        
        if (newBalance) {
            const result = await pool.query('SELECT idcuenta FROM cuenta WHERE idusuario = $1', [userId]);

            if (result.rows.length > 0) {
                const accountId = result.rows[0].idcuenta;
                await pool.query('UPDATE cuenta SET saldo = $1 WHERE idcuenta = $2', [newBalance, accountId]);
            } else {
                throw new Error('No se encontró una cuenta asociada al usuario');
            }
        }

        // Mover el bloque `res.status(200).json(...)` dentro del bloque `try`
        res.status(200).json({
            message: "Informacion de usuario y cuenta actualizada",
        });
    } catch(error) {
        console.error('Error al actualizar informacion de usuario y cuenta:', error);
        res.status(500).json({ error: 'Error interno del servidor'});
    }
}
