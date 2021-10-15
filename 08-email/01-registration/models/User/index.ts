import { UserDocument, UserModel, UserSchema } from './interfaces';
import { Schema } from 'mongoose';
import { connection } from '../../libs/connection';
import { generatePassword, generateSalt } from './utils';

const userSchema = new Schema<UserDocument, UserModel, UserSchema>({
  email: {
    type: String,
    required: [true, 'E-mail пользователя не должен быть пустым.'],
    validate: [
      {
        validator(value: string) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        message: 'Некорректный email.',
      },
    ],
    unique: 'Такой email уже существует' as any,
    // unique: true,
  },
  displayName: {
    type: String,
    required: [true, 'У пользователя должно быть имя'],
    unique: 'Такое имя уже существует' as any,
    // unique: true,
  },
  verificationToken: {
    type: String,
    index: true,
  },
  passwordHash: {
    type: String,
  },
  salt: {
    type: String,
  },
}, {
  timestamps: true,
});

userSchema.methods.setPassword = async function (password) {
  this.salt = await generateSalt();

  this.passwordHash = await generatePassword(this.salt, password);
};

userSchema.methods.checkPassword = async function (password) {
  if (!password) return false;

  const hash = await generatePassword(this.salt, password);

  return hash === this.passwordHash;
};

export const User = connection.model<UserDocument, UserModel>('User', userSchema);
