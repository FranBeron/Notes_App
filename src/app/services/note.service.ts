import { Note } from './../models/note';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  addNote = (note: Note) => {
    const dataNote = note.toJSON();
    const noteId = this.firestore.createId();
    dataNote.id = noteId;
    const userId = this.userService.getUserId();
    return this.firestore.collection(`users/${userId}/notes`).add(dataNote);
  };

  getNotes = () => {
    const userId = this.userService.getUserId();
    return this.firestore
      .collection<Note>(`users/${userId}/notes`)
      .valueChanges();
  };

  updateNote = (note: Note) => {
    const userId = this.userService.getUserId();
    return this.firestore.doc(`users/${userId}/notes/${note.id}`).update(note);
  };

  deleteNote(note: Note): Promise<void> {
    const userId = this.userService.getUserId();
    return this.firestore.collection(`users/${userId}/notes/${note}/${note.id}`).doc().delete();
  }
}
