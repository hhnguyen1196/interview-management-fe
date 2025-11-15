import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
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
  get<T>(endpoint: string, params?: Record<string, string | number>): Observable<HttpResponse<T>> {
    const url = `${this.url}/${endpoint}`;
    const headers = this.getHeaders();
    return this.http.get<T>(url, {headers, params, observe: 'response'});
  }

  /**
   * API POST
   * @param endpoint - endpoint of the API
   * @param body - request body
   */
  post<T, B>(endpoint: string, body: B): Observable<HttpResponse<T>> {
    const url = `${this.url}/${endpoint}`;
    let headers = this.getHeaders();
    return this.http.post<T>(url, body, {headers, observe: 'response'});
  }

  /**
   * API DELETE
   * @param endpoint - endpoint of the API
   */
  delete<T>(endpoint: string): Observable<HttpResponse<T>> {
    const url = `${this.url}/${endpoint}`;
    const headers = this.getHeaders();
    return this.http.delete<T>(url, {headers, observe: 'response'});
  }

  postFormData<T>(endpoint: string, data?: Record<string, unknown>): Observable<HttpResponse<T>> {
    const url = `${this.url}/${endpoint}`;
    const headers = this.getHeaders();
    const formData = new FormData();
    for (const key in data) {
      const value = data[key];
      if (value === null || value === undefined) {
        continue;
      }
      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else if (value instanceof Date) {
        formData.append(key, String(value));
      } else if (Array.isArray(value)) {
        value.forEach(o => formData.append(`${key}[]`, String(o)));
      } else {
        formData.append(key, String(value));
      }
    }
    return this.http.post<T>(url, formData, {headers, observe: 'response'});
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders();
  }
}
