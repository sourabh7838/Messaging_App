export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isEdited: boolean;
  senderId: string;
  senderName: string;
}

export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  isGroup: boolean;
  members: Member[];
  directoryId?: string;
}

export interface Member {
  id: string;
  name: string;
  isAdmin?: boolean;
}

export interface Directory {
  id: string;
  name: string;
  color: string;
  parentId?: string;
} 