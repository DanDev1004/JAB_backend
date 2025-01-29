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
            res.status(401).json({ message: 'Acceso degenado, no se ha proporcionado un token' });
            return; 
        }

        try {
      
            const decoded: any = jwt.verify(token, process.env.KEY_SECRET || '' );
            req.user = { userId: decoded.userId, role: decoded.role }; 

            const allowedRoles = roles[0].split(',');

            if (!allowedRoles.includes(req.user.role)) {
                res.status(403).json({ message: 'Permisos insuficientes' });
                return; 
            }

            next();
        } catch (error) {
            res.status(400).json({ message: 'token invalido' });
            return; 
        }
    };
};
