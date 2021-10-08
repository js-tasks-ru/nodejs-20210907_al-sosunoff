import { Model, Document } from 'mongoose';

export interface UserSchema {
  email: string;
  displayName: string;
  passwordHash: string;
  salt: string;
}

export interface UserDocument extends UserSchema, Document {
  setPassword: (password: string) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
}

export interface UserModel extends Model<UserDocument> {}
