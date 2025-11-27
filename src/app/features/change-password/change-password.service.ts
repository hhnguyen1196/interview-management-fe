import {inject, Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {map, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

export interface ChangePassword {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

@Injectable()
export class ChangePasswordService {
  private apiService = inject(ApiService);

  changePassword(data: ChangePassword): Observable<void> {
    return this.apiService.post<void, ChangePassword>(environment.endpoints.change_password, data).pipe(
      map(response => {
        if (response.status !== 204) {
          throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
        }
      })
    );
  }
}
