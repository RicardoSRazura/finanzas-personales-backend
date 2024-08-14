import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import { buscarIdUsuario } from '../libs/findUser.js';


export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message: "No autorizado"});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message: "No autorizado"});

        const userFound = await buscarIdUsuario(user.idusuario);
        if (!userFound) return res.status(401).json({message: "No autorizado"});
        
        return res.json({
            id: userFound.idusuario,
            username: userFound.nombre,
            email: userFound.email,
        });

    })
}