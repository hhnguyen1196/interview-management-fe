import {Component, inject, OnInit} from '@angular/core';
import {MenuModule} from 'primeng/menu';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {MenuItem} from 'primeng/api';
import {StorageService} from '../../core/services/storage.service';
import {Router} from '@angular/router';
import {AccountPanel, AccountPanelService} from './account-panel.service';

@Component({
  selector: 'app-account-panel',
  standalone: true,
  imports: [
    MenuModule,
    AvatarModule,
    ButtonModule
  ],
  templateUrl: './account-panel.component.html',
  providers: [AccountPanelService]
})
export class AccountPanelComponent implements OnInit {
  private localstorageService = inject(StorageService);
  private router = inject(Router);
  menuItems: MenuItem[] = [
    {
      label: 'Đổi mật khẩu',
      icon: 'pi pi-spinner',
      command: () => {
        console.log('Switch account');
      }
    },
    {
      label: 'Đăng xuất',
      icon: 'pi pi-sign-out',
      command: () => {
        this.localstorageService.removeToken();
        this.router.navigateByUrl('/login').then();
      }
    }
  ];
  accountPanel!: AccountPanel;

  constructor(private accountPanelService: AccountPanelService) {
  }

  ngOnInit(): void {
     this.accountPanelService.getInfoAccountById().subscribe(data => {
       this.accountPanel = data;
    });
  }

}
