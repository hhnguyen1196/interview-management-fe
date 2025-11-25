import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ApiService} from '../../services/api.service';
import {Pagination} from '../../shared/pagination';

export interface Account {
  id?: number;
  username?: string;
  password?: string;
  fullName?: string;
  dateOfBirth?: Date;
  email?: string;
  address?: string;
  phoneNumber?: string;
  gender?: string;
  role?: string;
  isActive?: boolean;
}

export interface AccountList {
  accountList: Account[],
  totalElements: number
}

export interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

export interface ExportColumn {
  title: string;
  dataKey: string;
}

@Injectable()
export class AccountService {
  private apiService = inject(ApiService);

  getAccounts(data: Pagination): Observable<AccountList> {
    const params = {
      page: data.page,
      size: data.size,
      search: data.search
    };
    return this.apiService.get<AccountList>(environment.endpoints.accounts, params).pipe(
      map(response => {
        if (response.status === 200) {
          return response.body!;
        }
        throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
      })
    );
  }

  saveAccount(data: Account): Observable<void> {
    return this.apiService.post<void, Account>(environment.endpoints.accounts, data).pipe(
      map(response => {
        if (!(response.status === 201 || response.status === 204)) {
          throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
        }
      })
    );
  }

  getJobById(id: number): Observable<Account> {
    return this.apiService.get<Account>(`${environment.endpoints.jobs}/${id}`).pipe(
      map(response => {
        if (response.status === 200) {
          return response.body!;
        }
        throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
      })
    );
  }

  deleteJob(id: number): Observable<void> {
    return this.apiService.delete<void>(`${environment.endpoints.jobs}/${id}`).pipe(
      map(response => {
        if (response.status !== 204) {
          throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
        }
      })
    );
  }
}

