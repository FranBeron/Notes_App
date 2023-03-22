import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { Note } from '../models/note';
import { UserService } from '../services/user.service';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  notes: Note[] = [];
  currentColor: string = '';
  favoriteNotes: Note[] = [];
  showMenu: boolean = false;
  userPic: any;
  user: any;

  constructor(
    private userService: UserService,
    private noteService: NoteService,
    private router: Router
  ) {
    const auth = getAuth();
    this.user = auth.currentUser;
    this.userPic = this.user.photoURL;
  }

  ngOnInit() {

    this.loadNotes();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: BeforeUnloadEvent) {
    this.saveNotes();
  }

  saveNotes() {
    const notes = this.notes;
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  onColorSelected(color: string) {
    this.currentColor = color;
    this.createNote();
  }

  logOut() {
    this.userService
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }

  createNote() {
    const note = new Note(
      '',
      this.user.uid,
      '',
      '',
      this.currentColor,
      new Date(),
      true,
      false
    );
    this.noteService.addNote(note).then(() => {
      this.loadNotes();
    });
  }

  loadNotes() {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  onDeleteNote(note: Note) {
    this.noteService.deleteNote(note.id)
    .then(() => {
      this.notes = this.notes.filter(n => n.id !== note.id);
    })
    .catch(error => console.log(error));
  }

  onUpdateNote(note: Note) {
    this.noteService.updateNote(note);
  }
}
