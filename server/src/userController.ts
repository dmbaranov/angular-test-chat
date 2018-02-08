import { Request, Response } from 'express';
import * as uuidv1 from 'uuid/v1';
import { IUser, IUserList } from './models/user.model';

const userList: IUserList = {}; // Because we don't have db, we store it as a global variable..

export const addNewUser: (req: Request, res: Response) => void = (req, res) => {
  console.log(`Creating new user`, req.body);
  const uid: string = uuidv1();
  const newUser: IUser = {
    id: uid,
    username: req.body.userData.username
  };

  userList[uid] = newUser;
  res.send({ ...newUser });
};

export const getUsers = (req: Request, res: Response): void => {
  const users = JSON.stringify(userList);
  res.send(users);
};
