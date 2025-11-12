import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LocalStorageJwtService {

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
