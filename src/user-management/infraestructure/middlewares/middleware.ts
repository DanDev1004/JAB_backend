import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: { userId: number; role: string };
        }
    }
}

export const verifyToken = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {  

        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
            return; 
        }

        try {
      
            const decoded: any = jwt.verify(token, 'your_jwt_secret');
            req.user = { userId: decoded.userId, role: decoded.role }; 

            const allowedRoles = roles[0].split(',');

            if (!allowedRoles.includes(req.user.role)) {
                res.status(403).json({ message: 'Forbidden: Insufficient permissions.' });
                return; 
            }

            next();
        } catch (error) {
            res.status(400).json({ message: 'Invalid token.' });
            return; 
        }
    };
};
