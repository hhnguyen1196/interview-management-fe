import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule
  ],
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
