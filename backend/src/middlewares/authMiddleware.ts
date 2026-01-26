import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
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
        console.log("⚠️ Missing authorization header");
        return res.status(401).json({error: 'Missing token'})
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT as string
        ) as JwtPayload;

        req.userId = decoded.id
        console.log("✅ Auth successful for user:", req.userId);
        next()
    } catch (error) {
        console.error("❌ Invalid token:", error);
        res.status(401).json({error:'Invalid token'})
    }
}