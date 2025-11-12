import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({providedIn: 'root'})
export class ApiService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * API GET
   * @param endpoint - endpoint of the API
   * @param params - optional query parameters
   */
  get<T>(endpoint: string, params?: Record<string, string | number>): Observable<T> {
    const url = `${this.url}/${endpoint}`;
    const headers = this.getHeaders();
    return this.http.get<T>(url, {headers, params});
  }

  /**
   * API POST
   * @param endpoint - endpoint of the API
   * @param body - request body
   */
  post<T, B>(endpoint: string, body: B): Observable<T> {
    const url = `${this.url}/${endpoint}`;
    let headers = this.getHeaders();
    return this.http.post<T>(url, body, {headers});
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders();
  }
}
