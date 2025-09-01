import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './user/homepage/navbar/navbar';
import { MenuDrawer } from './admin/menu-drawer/menu-drawer';
import { ManageListing } from './admin/manage-listing/manage-listing';
// import { Navbar } from './homepage/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [ManageListing],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CarResell-frontend');
  
}
