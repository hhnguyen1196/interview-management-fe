import {Component} from '@angular/core';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';
import {ChangePasswordComponent} from '../../../features/change-password/change-password.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet,
    ChangePasswordComponent,
  ],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  visible = false;

  openPasswordDialog() {
    this.visible = true;
  }
}
