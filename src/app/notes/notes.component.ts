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
  filteredNotes: any[] = [];
  loading = false;
  showSkeleton: boolean = false;
  constructor() {}

  filterNotes() {
    this.filteredNotes = this.notes.filter((note) =>
      note.content.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onDeleteNote(index: number) {
    this.deleteNote.emit(index);
  }
}
