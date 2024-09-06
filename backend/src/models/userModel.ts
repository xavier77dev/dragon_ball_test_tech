import mongoose, { Document, Schema } from 'mongoose';
import { ICharacter } from './characterModel';

export interface IUser extends Document {
  username: string;
  password: string;
  characters?: ICharacter['_id'][] | null;
  createdAt?: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', userSchema);
