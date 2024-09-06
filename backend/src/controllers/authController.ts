import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import User from '../models/userModel';
import { generateJWT } from '../utils/jwt';
import { Types } from 'mongoose';


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log(req.body)
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET!).toString();

    const newUser = new User({
      username,
      password: encryptedPassword,
      characters: null,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};



export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET!).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateJWT({ id: user._id as Types.ObjectId });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
