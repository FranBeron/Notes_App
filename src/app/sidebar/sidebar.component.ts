import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() colorSelected = new EventEmitter<string>();

  isRotated = false;

  onRotateButtonClick() {
    this.isRotated = true;
  }
  
  onColorSelected(color: string) {
    this.colorSelected.emit(color);
  }
}
