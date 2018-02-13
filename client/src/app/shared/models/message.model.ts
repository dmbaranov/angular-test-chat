import { IUser } from './user.model';

// export interface IMessage {
//   id: string;
//   from: string;
//   text: string;
//   authorName?: string;
//   authorAvatar?: string;
//   authorIsAdmin: boolean;
// }

export interface IMessage {
  text: string;
  from?: IUser;
}
