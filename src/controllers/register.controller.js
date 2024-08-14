import { pool } from '../db.js'
import bcrypt from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js'

export const register = async (req, res) => {
    try {
        const nombre = req.body.nombre;
        const email = req.body.email;
        const contrasena = req.body.contrasena;

        const existingUsuario = await pool.query('SELECT * FROM usuario WHERE email = $1', [email])
        
        if (existingUsuario.rows.length > 0) {
            return res.status(400).json( ['El Correo electronico ya existe' ]);
        }
        const passwordHash = await bcrypt.hash(contrasena, 10);

        //Aqui insertamos el nuevo usuario
        const newUser = await pool.query(
            "INSERT INTO usuario (nombre, email, contrasena) VALUES ($1, $2, $3) RETURNING *",[nombre, email, passwordHash]
        );

        //Creacion del token
        const token = await createAccessToken({id: newUser.rows[0].idusuario})
        res.cookie('token', token);

        res.status(201).json({
            id: newUser.rows[0].idusuario,
            username: newUser.rows[0].nombre,
            email: newUser.rows[0].email,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};