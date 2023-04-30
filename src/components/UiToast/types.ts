export enum MessageType {
  Success = 'success',
  Error = 'error'
}

export type Message = {
  id?: string | number,
  content: string,
  delay?: number,
  type: MessageType,
}