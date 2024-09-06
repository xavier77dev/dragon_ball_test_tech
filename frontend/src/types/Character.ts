export interface Character {
  _id: string;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: Date | null;
  createdAt: Date;
  owner: string;
  __v: number;
}
