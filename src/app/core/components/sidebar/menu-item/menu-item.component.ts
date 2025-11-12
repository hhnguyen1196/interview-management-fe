import {Component, Input} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {NgClass} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
  @Input() item!: MenuItem;
}
