import {Component, OnInit, signal} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DatePickerModule} from "primeng/datepicker";
import {DialogModule} from "primeng/dialog";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {SelectModule} from "primeng/select";
import {PasswordModule} from 'primeng/password';
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {TextareaModule} from "primeng/textarea";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Account, AccountService} from './account.service';
import {MessageService} from 'primeng/api';
import {activeOptions, genderOptions, Option, roleOptions} from '../../utils/options';
import {toLookupMap} from '../../utils/helpers';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    DatePickerModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PasswordModule,
    MultiSelectModule,
    SelectModule,
    TagModule,
    TextareaModule,
    ToastModule,
    ToolbarModule,
    FormsModule,
    TableModule,
    CommonModule
  ],
  templateUrl: './account.component.html',
  providers: [MessageService, AccountService]
})
export class AccountComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.initData();
  }

  accounts = signal<Account[]>([]);
  totalRecords = signal<number>(0);
  page = signal<number>(0);
  size = signal<number>(10);
  search = '';
  account!: Account;
  submitted = false;
  accountDialog = false;
  genderOptions!: Option[];
  roleOptions!: Option[];
  roleMap!: Record<string, string>;
  activeOptions!: Option<string, boolean>[];

  loadData() {
    this.accountService.getAccounts({
      page: this.page(),
      size: this.size(),
      search: this.search,
    }).subscribe(data => {
      this.accounts.set(data.accountList);
      this.totalRecords.set(data.totalElements)
    });
  }

  getHeaderText() {
    return this.account?.id ? 'CHI TIẾT TÀI KHOẢN' : 'TẠO MỚI TÀI KHOẢN';
  }

  onSearch(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.loadData();
  }

  openCreateAccount() {
    this.account = {};
    this.submitted = false;
    this.accountDialog = true;
  }

  hideDialog() {
    this.account = {};
    this.accountDialog = false;
    this.submitted = false;
  }

  editAccount(id: number) {
    this.accountService.getJobById(id).subscribe({
      next: data => {
        this.account = {
          ...data,
          dateOfBirth: new Date(data.dateOfBirth!)
        };
        this.accountDialog = true;
      }
    })
  }

  saveAccount() {
    this.submitted = true;
    if (!(this.account.username?.trim() && this.account.password?.trim() && this.account.role
      && this.account.email?.trim())) {
      console.log(this.account);
      return;
    }
    const isCreated = !this.account.id
    const successMessage = isCreated ? 'Tạo tài khoản thành công' : 'Cập nhật tài khoản thành công';
    const errorMessage = isCreated ? 'Tạo tài khoản thất bại' : 'Cập nhật tài khoản thất bại';
    this.accountService.saveAccount(this.account).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'info',
            icon: 'pi-check-circle',
            summary: successMessage,
            life: 3000
          });
          this.search = '';
          this.loadData();
          this.accountDialog = false;
          this.account = {};
        },
        error: err => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            icon: 'pi-times-circle',
            summary: errorMessage,
            life: 3000
          });
        }
      }
    )
  }

  getIsActiveSeverity(isActive: boolean) {
    return isActive ? 'success' : 'danger';
  }

  onPageChange(event: TableLazyLoadEvent) {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.size();
    const currentPage = Math.floor(first / rows);
    this.page.set(currentPage);
    this.size.set(rows);
    this.loadData();
  }

  initData() {
    this.genderOptions = genderOptions;
    this.roleOptions = roleOptions;
    this.activeOptions = activeOptions;
    this.roleMap = toLookupMap(this.roleOptions);
  }
}
