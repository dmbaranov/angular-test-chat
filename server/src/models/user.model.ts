export interface IUser {
  id?: string;
  username?: string;
}

export interface IUserList {
  [id: string]: IUser;
}
