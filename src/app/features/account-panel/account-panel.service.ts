import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ApiService} from '../../services/api.service';

export interface AccountPanel {
  username?: string;
}

@Injectable()
export class AccountPanelService {

  private apiService = inject(ApiService);

  getInfoAccountById(): Observable<AccountPanel> {
    return this.apiService.get<AccountPanel>(`${environment.endpoints.accounts}/info`).pipe(
      map(response => {
        if (response.status === 200) {
          return response.body!;
        }
        throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
      })
    );
  }
}

