import { IUser } from './user.model';

export interface IMessage {
  text: string;
  from: IUser;
}
