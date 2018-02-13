export type WebsocketMessage =
  | 'users'
  | 'users/create'
  | 'users/exit'
  | 'messages'
  | 'messages/create';
