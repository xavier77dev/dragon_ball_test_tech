import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './userModel';

export interface ICharacter extends Document {
  _id: null;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt?: Date | null;
  createdAt?: Date;
  owner: IUser['_id'];
}

const characterSchema = new Schema<ICharacter>({
  name: { type: String, required: true },
  ki: { type: String, required: true },
  maxKi: { type: String, required: true },
  race: { type: String, required: true },
  gender: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, required: true },
  affiliation: { type: String, default: '' },
  deletedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<ICharacter>('Character', characterSchema);
