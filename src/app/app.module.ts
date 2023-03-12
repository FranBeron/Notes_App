import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesComponent } from './notes/notes.component';

import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent,
    NotesComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule
  ],
  exports: [
    FilterPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
