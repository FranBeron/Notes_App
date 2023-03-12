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
    this.loading = true;
    this.showSkeleton = true;
  
    setTimeout(() => {
      this.filteredNotes = this.notes.filter((note) =>
        note.content.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.loading = false;
      this.showSkeleton = false;
    }, 2000);
  }
  

  onDeleteNote(index: number) {
    this.deleteNote.emit(index);
  }
}
