export interface IUser {
  id?: string;
  username?: string;
  isAdmin?: boolean;
  avatar?: string;
}

export interface IUserList {
  [id: string]: IUser;
}
