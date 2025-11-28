import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {ChangePassword, ChangePasswordService} from './change-password.service';
import {PasswordModule} from 'primeng/password';
import {FormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  templateUrl: './change-password.component.html',
  providers: [ChangePasswordService, MessageService]
})
export class ChangePasswordComponent {

  constructor(private changePasswordService: ChangePasswordService, private messageService: MessageService) {
  }

  private _visible: boolean = false;

  @Input() get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
    this.changePassword = {};
    if (value) {
      this.initChangePassword();
    }
  }


  @Output() visibleChange = new EventEmitter<boolean>();
  changePassword: ChangePassword = {};
  submitted = false;
  loading = false;

  initChangePassword() {
    this.submitted = false;
  }

  onChangePassword(): void {
    this.submitted = true;
    if (!(this.changePassword.oldPassword?.trim() && this.changePassword.newPassword?.trim()
      && this.changePassword.confirmPassword?.trim())) {
      return;
    }
    if (this.changePassword.newPassword !== this.changePassword.confirmPassword) {
      return;
    }
    this.loading = true;
    this.changePasswordService.changePassword(this.changePassword).subscribe({
        next: () => {
          this.loading = false;
          this.messageService.add({
            severity: 'info',
            icon: 'pi-check-circle',
            summary: 'Đổi mật khấu thành công',
            life: 3000
          });
          this.hideDialog();
        },
        error: err => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            icon: 'pi-times-circle',
            summary: err.error.message,
            life: 3000
          });
        }
      }
    )
  }

  hideDialog() {
    this.submitted = false;
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
