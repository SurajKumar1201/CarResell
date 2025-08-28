import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import gsap from 'gsap';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
@ViewChildren('navItems') navItems!: QueryList<ElementRef<HTMLElement>>;
  private tl=gsap.timeline()

  ngAfterViewInit(): void {
    const nodes = this.navItems.toArray().map(ref => ref.nativeElement);
    this.tl.from(nodes, {
      opacity: 0,
      y: -12,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.2,
    });
  }
}
