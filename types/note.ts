export enum Tag {
  WORK = 'Work',
  PERSONAL = 'Personal',
  MEETING = 'Meeting',
  SHOPPING = 'Shopping',
  TODO = 'Todo',
}

export type NoteTag = (typeof Tag)[keyof typeof Tag];

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export interface NewNote {
  title: string;
  content?: string;
  tag: NoteTag;
}
