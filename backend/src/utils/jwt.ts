import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

interface UserPayload {
  id: Types.ObjectId;
}

export const generateJWT = (payload: UserPayload) => {
  const secretKey = process.env.SECRET_KEY;

  if (!secretKey) {
    throw new Error('SECRET_KEY is not defined');
  }

  const token = jwt.sign(payload, secretKey, {
    expiresIn: '30d',
  });

  return token;
};
