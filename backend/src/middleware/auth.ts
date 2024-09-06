import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import userModel, { IUser } from '../models/userModel';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

interface TokenPayload extends JwtPayload {
  id: string;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    const error = new Error('No autorizado');
    return res.status(401).json({ error: error.message });
  }

  const token = bearer!.split(' ')[1];

  try {

    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as TokenPayload;

    if (decoded && decoded.id) {
      const user = await userModel.findById(decoded.id).select("_id username");

      if (user) {
        req.user = user
      } else {
        res.status(500).json({ error: "Token invalido" })
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Token invalido" })
  };

  next()
}


