import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class StorageService {

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
