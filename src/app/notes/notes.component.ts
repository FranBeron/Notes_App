import { Component, EventEmitter, Input, Output } from '@angular/core';
import jsPDF from 'jspdf';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  searching = false;
  showSkeleton = false;
  searchTimer: any;



  constructor() {
    this.searchTimer = null;
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

  shareNote(note: any) {
    const text = note.content;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const fileName = `note.txt`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    link.click();
  }
}
