import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    Password,
    Button,
    InputText
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly router = inject(Router);
  user: string = '';
  password: string = '';

  onSubmit() {
    localStorage.setItem('token', 'hello');
    this.router.navigateByUrl('/').then();
  }
}

