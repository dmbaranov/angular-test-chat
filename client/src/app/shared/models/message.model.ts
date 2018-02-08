export interface IMessage {
  id: string;
  from: string;
  text: string;
  authorName?: string;
  authorAvatar?: string;
  authorIsAdmin: boolean;
}
