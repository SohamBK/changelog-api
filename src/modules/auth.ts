import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createJWT = (user) => {
    const token = jwt.sign({id: user.id, username: user.username},
        process.env.JWT_SECERT)
    return token
}

export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization
    //const bearer = req.headers["authorization"];

    console.log(bearer)
    console.log(req.headers)
    if (!bearer) {
        res.status(401)
        res.json({message : "Not authorized"})
        return 
    }

    const [, token] = bearer.split(" ")

    if(!token){
        res.status(401)
        res.json({message : "Not a valid token"})
        return 
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECERT)
        req.user = user
        next()
    } catch (e) {
        res.status(401)
        res.json({message : "Not a valid token"})
        return 
    }
}