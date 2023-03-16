import { Note } from './../models/note';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as MarkdownIt from 'markdown-it';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent {
  @Input() notes: Note[] = [];
  @Output() deleteNote = new EventEmitter<number>();
  searchText: string = '';
  filteredNotes: any[] = [];
  loading = false;
  searching = false;
  showSkeleton = false;
  searchTimer: any;
  editingNoteIndex: number | null = null;
  markdown = new MarkdownIt();
  selectedNoteIndex: number = -1;
  editing: boolean = false;
  selectedNoteId: number | null = null;

  constructor() {
    this.searchTimer = null;
  }

  ngOnInit() {
    this.sortNotes();
  }

  toggleFavorite(note: Note) {
    note.favorite = !note.favorite;
    if (note.favorite) {
      const index = this.notes.indexOf(note);
      this.notes.splice(index, 1);
      this.notes.unshift(note);
    } else {
      this.sortNotes();
    }
  }

  sortNotes() {
    this.notes.sort((a, b) => {
      if (a.favorite && !b.favorite) {
        return -1;
      } else if (!a.favorite && b.favorite) {
        return 1;
      } else {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });
  }

  startEditing(noteId: number) {
    this.selectedNoteId = noteId;
  }

  stopEditing(noteId: number) {
    this.selectedNoteId = null;
  }

  filterNotes() {
    this.filteredNotes = this.notes.filter((note) =>
      note.content.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onSearchInput() {
    this.showSkeleton = true; // mostrar el skeleton loader
    clearTimeout(this.searchTimer); // reiniciar el temporizador
    this.searchTimer = setTimeout(() => {
      this.filterNotes(); // ejecutar la función filterNotes después de medio segundo
      this.showSkeleton = false; // ocultar el skeleton loader
    }, 500);
  }

  onDeleteNote(index: number) {
    this.deleteNote.emit(index);
  }

  shareNote(note: Note) {
    const text = note.content;
    const title = note.title;
    const blob = new Blob([title, text], { type: 'text/plain;charset=utf-8' });
    const fileName = `note_${note.title}.txt`;;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    link.click();
  }
}
