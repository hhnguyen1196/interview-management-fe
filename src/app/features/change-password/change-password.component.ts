import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {ChangePassword, ChangePasswordService} from './change-password.service';
import {PasswordModule} from 'primeng/password';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    FormsModule
  ],
  templateUrl: './change-password.component.html',
  providers: [ChangePasswordService]
})
export class ChangePasswordComponent {

  constructor(private changePasswordService: ChangePasswordService) {
  }

  private _visible: boolean = false;

  @Input() get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
    if (value) {
      this.initChangePassword();
    }
  }


  @Output() visibleChange = new EventEmitter<boolean>();
  changePassword: ChangePassword = {};
  submitted = false;

  initChangePassword() {
    this.submitted = false;
  }

  onChangePassword(): void {
    console.log(this.changePassword)
    this.submitted = true;
    if (!(this.changePassword.oldPassword?.trim() && this.changePassword.newPassword?.trim()
      && this.changePassword.confirmPassword?.trim())) {
      return;
    }
    if (this.changePassword.newPassword !== this.changePassword.confirmPassword) {
      return;
    }
    this.changePasswordService.changePassword(this.changePassword).subscribe()
  }

  hideDialog() {
    this.submitted = false;
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
