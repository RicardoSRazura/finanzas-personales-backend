
import { buscarIdUsuario } from '../libs/findUser.js';

export const profile = async (req, res) => {
    const userId = req.user.idusuario
    const userFound = await buscarIdUsuario(userId);

    if (userFound === null) return res.status(400).json({message: "User not found"});

    return res.json({
        id: userFound.idusuario,
        username: userFound.nombre,
        email: userFound.email,
    });
}