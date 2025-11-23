import {inject, Injectable} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

export interface Login {
  username?: string;
  password?: string;
}

export interface Token {
  token?: string;
}

@Injectable()
export class LoginService {
  private apiService = inject(ApiService);

  login(data: Login): Observable<Token> {
    return this.apiService.post<Token, Login>(environment.endpoints.login, data).pipe(
      map(response => {
        if (response.status !== 200) {
          throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
        }
        return response.body!;
      })
    );
  }
}
