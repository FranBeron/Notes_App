import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() colorSelected = new EventEmitter<string>();

  isRotated = false;
  isMenuOpen = false;

  onRotateButtonClick() {
    this.isRotated = !this.isRotated;
  }

  onMenuClosed() {
    this.isMenuOpen = false;
    if (this.isRotated) {
      this.isRotated = false;
    }
  }
  
  onColorSelected(color: string) {
    this.colorSelected.emit(color);
  }
  
}
