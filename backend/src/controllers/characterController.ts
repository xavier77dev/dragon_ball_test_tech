import { Request, Response } from 'express';
import Character from '../models/characterModel';
import { fetchAndStoreCharacters } from '../services/characterService';
import userModel from '../models/userModel';

export const createCharacter = async (req: Request, res: Response) => {
  try {
    const { name, ki, maxKi, race, gender, description, image, affiliation } = req.body;

    console.log(req.body);
    const userId = req.user?._id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newCharacter = new Character({
      name,
      ki,
      maxKi,
      race,
      gender,
      description,
      image,
      affiliation,
      owner: userId,
    });

    const savedCharacter = await newCharacter.save();

    res.status(201).json(savedCharacter);
  } catch (error) {
    res.status(500).json({ message: 'Error creating character', error });
  }
};


export const getUserCharacters = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const characters = await Character.find({ owner: userId });

    res.status(200).json(characters);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error al obtener los personajes', error });
  }
};


export const syncCharacters = async (req: Request, res: Response): Promise<void> => {

  try {
    await fetchAndStoreCharacters(req.user!);
    res.status(200).json({ message: 'Characters synchronized successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};


export const getDetailIdCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const character = await Character.findById(id);
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ message: 'Error getting character', error });
  }
};


export const getUserNameOwner = async (req: Request, res: Response) => {
  try {
    const userName = req.user?.username;
    const user = await userModel.findOne({ username: userName });
    res.status(200).json(user?.username);
  } catch (error) {
    res.status(500).json({ message: 'Error getting character', error });
  }
};

export const putCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, ki, maxKi, race, gender, description, image, affiliation } = req.body;

    const character = await Character.findById(id);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    character.name = name || character.name;
    character.ki = ki || character.ki;
    character.maxKi = maxKi || character.maxKi;
    character.race = race || character.race;
    character.gender = gender || character.gender;
    character.description = description || character.description;
    character.image = image || character.image;
    character.affiliation = affiliation || character.affiliation;

    await character.save();

    return res.status(200).json({ message: 'Character updated successfully', character });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const deleteCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const character = await Character.findByIdAndDelete(id);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.status(200).json({ message: 'Character deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting character', error });
  }
}
