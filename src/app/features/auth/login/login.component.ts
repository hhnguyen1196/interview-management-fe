import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';
import {InputText} from 'primeng/inputtext';
import {Login, LoginService} from './login.service';

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
  styleUrl: './login.component.css',
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.login = {}
  }

  login!: Login;
  message!: string;

  onSubmit() {
    this.loginService.login(this.login).subscribe({
      next: data => {
        localStorage.setItem('token', data.token!);
        this.router.navigateByUrl('/').then();
      },
      error: err => {
        this.message = err.error.message;
      }
    });
  }
}

