export type MessageType = 'success' | 'error';

export type Message = {
  id?: string | number,
  content: string,
  delay?: number,
  type: MessageType,
}