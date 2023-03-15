import { Component, EventEmitter, Input, Output } from '@angular/core';
import jsPDF from 'jspdf';

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

  exportPDF() {
    const doc = new jsPDF();
    const notes = this.notes.filter((note) => !note.new);
    const pageHeight = doc.internal.pageSize.getHeight();
    const noteWidth = 100;
    const noteHeight = 100; // Altura inicial de la nota
    let y = 20; // Posición vertical actual
  
    notes.forEach((note, index) => {
      const createdAt = note.createdAt.toLocaleDateString();
      const lines = doc.splitTextToSize(note.content, noteWidth - 10);
      const contentHeight = doc.getTextDimensions(note.content).h;
      const height = Math.max(contentHeight + 30, noteHeight);
  
      // Si la nota actual no cabe en la página actual, agregue un salto de página
      if (y + height + 20 > pageHeight) {
        doc.addPage();
        y = 20;
      }
  
      doc
        .setFillColor(note.backgroundColor)
        .rect(50, y, noteWidth, height, 'F')
        .setFontSize(8)
        .text(createdAt, 60, y + 10)
        .setFontSize(12)
        .text(lines, 60, y + 25);
  
      y += height + 20; // Agregar margen inferior para la siguiente nota
    });
  
    doc.save('notes.pdf');
  }
  
  
}
