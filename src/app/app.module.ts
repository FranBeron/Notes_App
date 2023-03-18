import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // importa ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesComponent } from './notes/notes.component';
import { LoginComponent } from './login/login.component';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent,
    NotesComponent,
    LoginComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, // agrega ReactiveFormsModule
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ],
  exports: [FilterPipe],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
