import axios from 'axios';
import Character, { ICharacter } from '../models/characterModel';
import { IUser } from '../models/userModel';

export const fetchAndStoreCharacters = async (user: IUser): Promise<void> => {
  console.log(process.env.API_DRAGONBALL)
  try {
    const response = await axios.get<{ items: ICharacter[] }>(`${process.env.API_DRAGONBALL}`);

    await Character.deleteMany({ owner: user._id });

    const characters = response.data.items;


    for (const character of characters) {
      await Character.create({
        name: character.name,
        ki: character.ki || '',
        maxKi: character.maxKi || '',
        race: character.race || 'Unknown',
        gender: character.gender || '',
        description: character.description || '',
        image: character.image || '',
        affiliation: character.affiliation || '',
        deletedAt: character.deletedAt || null,
        createdAt: character.createdAt || new Date(),
        owner: user._id,
      });
    }

    console.log('Characters stored successfully');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching characters:', error.message);
    } else {
      console.error('Unknown error occurred while fetching characters');
    }
  }
};
