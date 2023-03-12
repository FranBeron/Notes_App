import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent {
  @Input() notes: any[] = [];
  @Output() deleteNote = new EventEmitter<number>();
  searchText: string = '';
  filteredNotes: any[] = []; // variable para almacenar las notas filtradas
  loading = false; // variable para indicar si se está cargando o no

  constructor() {}

  filterNotes() {
    this.loading = true;
    this.filteredNotes = this.notes.filter((note) =>
      note.content.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.loading = false;
  }

  onDeleteNote(index: number) {
    this.deleteNote.emit(index);
  }
}
