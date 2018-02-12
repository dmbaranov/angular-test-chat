// import app from './app';

// app.listen(3001, () => {
//   console.log('listening on port 3001');
// });

import http from './app';

http.listen(3001, () => {
  console.log('started on port 3001');
});
