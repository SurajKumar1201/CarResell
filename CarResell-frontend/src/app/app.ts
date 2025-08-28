import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './user/homepage/navbar/navbar';
import { Home } from './admin/home/home';
// import { Navbar } from './homepage/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [Home, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CarResell-frontend');
}
