import * as uuidv1 from 'uuid/v1';
import { IUser, IUserList } from './models/user.model';
import * as Socket from 'socket.io';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// io.on('connection', socket => {
//   let interval = null;
//   console.log('user connected');
//   socket.join('timer');

//   socket.on('disconnect', function() {
//     console.log('user disconnected');
//     clearInterval(interval);
//   });

//   socket.on('message', message => {
//     console.log('Message Received: ' + message);
//     io.emit('message', { type: 'new-message', text: message });
//   });

//   setInterval(() => {
//     console.log('Emitting...');
//     io.emit('messages', 'Test message from socket server');
//   }, 3000);
// });

const userList: IUserList = {}; // Because we don't have db, we store it as a global variable..

io.on('connection', (socket: any) => {
  console.log('user connected');

  socket.on('disconnect', data => {
    console.log('user disconnected', data);
  });

  socket.on('users/create', data => {
    console.log(`Creating new user`, data);

    const uid: string = uuidv1();
    const newUser: IUser = {
      id: uid,
      username: data.username
    };

    userList[uid] = newUser;
    socket.emit('users/create', { ...newUser });
    io.emit('users', userList);
  });

  socket.on('users', () => {
    console.log('Sending list of users...');
    io.emit('users', userList);
  });

  socket.on('users/exit', (uid: string) => {
    console.log('User leaves', uid);
    delete userList[uid];
    io.emit('users', userList);
  });
});

// io.on('users/create', (data: IUser) => {
// console.log(`Creating new user`, data);

// socket.emit('users/create', {

// });
// const uid: string = uuidv1();
// const newUser: IUser = {
//   id: uid,
//   username: data.username
// };

// userList[uid] = newUser;
//   socket.emit('users/create', {

// });
// });

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
