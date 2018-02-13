import * as uuidv1 from 'uuid/v1';
import * as Socket from 'socket.io';
import { IUser, IUserList } from './models/user.model';
import { IMessage } from './models/message.model';
import { COLORS } from './colors';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const userList: IUserList = {}; // Because we don't have db, we store it as a global variable..
const messagesList: IMessage[] = [];

io.on('connection', (socket: any) => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('users', () => {
    // TODO: if doesn't work, make io.emit('users', userList)
    console.log('Sending list of users...');
    socket.emit('users', userList);
  });

  socket.on('users/create', (data: any) => {
    console.log(`Creating new user`, data);

    const colorIndex = Math.floor(Math.random() * COLORS.length);
    const uid: string = uuidv1();
    const newUser: IUser = {
      id: uid,
      username: data.username.startsWith('[admin]') ? data.username.slice(7) : data.username,
      isAdmin: data.username.startsWith('[admin]'),
      avatar: COLORS[colorIndex]
    };

    userList[uid] = newUser;
    socket.emit('users/create', { ...newUser });
    io.emit('users', userList);
  });

  socket.on('users/exit', (uid: string) => {
    console.log('User leaves', uid);
    delete userList[uid];
    io.emit('users', userList);
  });

  socket.on('messages', () => {
    console.log('Sending list of messages...');
    socket.emit('messages', messagesList);
  });

  socket.on('messages/create', (msg: any) => {
    console.log('Adding new message...', msg);
    messagesList.push(msg);
    // socket.emit('messages/create', msg);
    io.emit('messages', messagesList);
  });
});

export default http;

// import * as express from 'express';
// import { Request, Response, NextFunction } from 'express';
// import * as bodyParser from 'body-parser';
// import * as userController from './userController';

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req: Request, res: Response, next: NextFunction): void => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   next();
// });

// // TODO: check why with app.use you need to call controller functions manually
// app.get('/api/users', userController.getUsers);
// app.post('/api/users/create', userController.addNewUser);

// export default app;
