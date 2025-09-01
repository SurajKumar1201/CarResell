import { Component, ViewChild } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Drawer as PDrawer, DrawerModule } from 'primeng/drawer';
import { Ripple } from 'primeng/ripple';
import { StyleClass } from 'primeng/styleclass';

@Component({
  selector: 'app-menu-drawer',
  imports: [DrawerModule, ButtonModule, Ripple, AvatarModule, StyleClass],
  templateUrl: './menu-drawer.html',
  styleUrl: './menu-drawer.scss'
})
export class MenuDrawer {
  @ViewChild('drawerRef') drawerRef!: PDrawer;

  visible = false;

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

}
