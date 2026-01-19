import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { error } from "node:console";

interface JwtPayload {
    id:string
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({error: 'Missing token'})
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT as string
        ) as JwtPayload;

        req.userId = decoded.id
        next()
    } catch {
        res.status(401).json({error:'Invalid token'})
    }
}