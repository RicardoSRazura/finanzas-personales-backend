import bcrypt from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js'
import { buscarUsuario } from '../libs/findUser.js';

export const login = async (req, res) => {
        const email = req.body.email;
        const contrasena = req.body.contrasena;
    try {
        

        const userFound = await buscarUsuario(email);        
        if (!userFound) {
            return res.status(400).json({ message: 'El Correo electronico no esta registrado' });
        }

        //Verifica la contraseña
        const isMatch = await bcrypt.compare(contrasena, userFound.contrasena);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        //Creacion del token
        const token = await createAccessToken({idusuario: userFound.idusuario })
        
        res.cookie('token', token);
        res.status(200).json({
            id: userFound.idusuario,
            username: userFound.nombre,
            email: userFound.email,
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error interno en el servidor' });
    }
};