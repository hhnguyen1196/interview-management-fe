import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MenuItemComponent} from './menu-item/menu-item.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MenuItemComponent
  ],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  menuItem: MenuItem[] = [
    {
      label: 'Trang chủ',
      icon: 'pi pi-home',
      routerLink: ''
    },
    {
      label: 'Ứng viên',
      icon: 'pi pi-users',
      routerLink: '/candidate'
    },
    {
      label: 'Công việc',
      icon: 'pi pi-shopping-bag',
      routerLink: '/job'
    },
    {
      label: 'Phỏng vấn',
      icon: 'pi pi-comments',
      routerLink: '/interview'
    },
    {
      label: 'Quản lý tài khoản',
      icon: 'pi pi-user',
      routerLink: '/account'
    },
  ];
}
