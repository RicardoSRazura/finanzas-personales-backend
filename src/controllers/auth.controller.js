import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config'

export const verify = async (req, res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message: "No autorizado"})
    
    jwt.verify

}