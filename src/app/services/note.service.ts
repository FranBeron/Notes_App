import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private firestore: AngularFirestore, private userService: UserService) {}

  addNote = (note: any) => {
    const userId = this.userService.getUserId();
    return this.firestore.collection(`users/${userId}/notes`).add(note);
  };

  getNotes = () => {
    const userId = this.userService.getUserId();
    return this.firestore.collection(`users/${userId}/notes`).snapshotChanges();
  };

  updateNote = (note: any) => {
    const userId = this.userService.getUserId();
    return this.firestore.doc(`users/${userId}/notes/${note.id}`).update(note);
  };

  deleteNote = (noteId: any) => {
    const userId = this.userService.getUserId();
    return this.firestore.doc(`users/${userId}/notes/${noteId}`).delete();
  };
}
