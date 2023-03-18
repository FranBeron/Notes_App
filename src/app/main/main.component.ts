import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Note } from '../models/note';
import { UserService } from '../services/user.service';

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

  constructor(private userService: UserService, private router: Router) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
      this.userPic = user.photoURL;
    }
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

  loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    this.favoriteNotes = notes.filter((note: Note) => note.favorite);
    this.notes = notes.filter((note: Note) => !note.favorite);
    this.notes = this.favoriteNotes.concat(this.notes);
    this.notes = this.notes.map((note: Note) => {
      const loadedNote = new Note(
        note.title,
        note.content,
        note.backgroundColor,
        new Date(note.createdAt),
        note.new,
        note.favorite,
        note.id
      );
      loadedNote.id = note.id;
      return loadedNote;
    });
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
    const note = new Note('', '', this.currentColor);
    note.id = this.generateNoteId(); // Asignamos un nuevo valor a la propiedad `id`
    this.notes.push(note);
    this.currentColor = note.backgroundColor;
    setTimeout(() => {
      note.new = false;
    }, 1000);
  }

  generateNoteId(): number {
    let id = 1;
    if (this.notes.length > 0) {
      id = Math.max(...this.notes.map((note) => note.id)) + 1;
    }
    return id;
  }

  onDeleteNote(index: number) {
    this.notes.splice(index, 1);
    this.saveNotes();
  }
}
