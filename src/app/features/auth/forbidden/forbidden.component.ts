import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule
  ],
  templateUrl: './forbidden.component.html'
})
export class ForbiddenComponent {
}
