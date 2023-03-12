import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  notes: any[] = [];
  currentColor: string = '';

  constructor() {}

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

  loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    this.notes = notes.map((note: any) => {
      return { ...note, createdAt: new Date() };
    });
  }

  onColorSelected(color: string) {
    this.currentColor = color;
    this.createNote();
  }

  createNote() {
    const note = {
      backgroundColor: this.currentColor,
      content: '',
      createdAt: new Date(),
      new: true,
    };
    this.notes.push(note);
    this.currentColor = note.backgroundColor;
    setTimeout(() => {
      note.new = false;
    }, 1000);
  }

  onDeleteNote(index: number) {
    this.notes.splice(index, 1);
    this.saveNotes();
  }
}
