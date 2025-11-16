import {inject, Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Pagination} from '../../shared/pagination';
import {map, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

export interface Interview {
  id?: number;
  fullName?: string;
  email?: string;
  dateOfBirth?: Date;
  address?: string;
  phoneNumber?: string;
  gender?: string;
  cvAttachment?: File;
  filename?: string;
  cvFilePath?: string;
  position?: string;
  yearOfExperience?: number;
  skills?: string[] | null;
  level?: string;
  note?: string;
  status?: string;
}

export interface InterviewList {
  interviewList: Interview[],
  totalElements: number
}

@Injectable()
export class InterviewService {
  private apiService = inject(ApiService);

  getCandidates(data: Pagination): Observable<InterviewList> {
    const params = {
      page: data.page,
      size: data.size,
      search: data.search
    };
    return this.apiService.get<InterviewList>(environment.endpoints.candidates, params).pipe(
      map(response => {
        if (response.status === 200) {
          return response.body!;
        }
        throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
      })
    );
  }

  saveCandidate(data: Interview): Observable<void> {
    return this.apiService.postFormData<void>(environment.endpoints.candidates, data as Record<string, unknown>)
      .pipe(map(response => {
          if (!(response.status === 201 || response.status === 204)) {
            throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
          }
        })
      );
  }

  getCandidateById(id: number): Observable<Interview> {
    return this.apiService.get<Interview>(`${environment.endpoints.candidates}/${id}`).pipe(
      map(response => {
        if (response.status === 200) {
          return response.body!;
        }
        throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
      })
    );
  }

  deleteCandidate(id: number): Observable<void> {
    return this.apiService.delete<void>(`${environment.endpoints.candidates}/${id}`).pipe(
      map(response => {
        if (response.status !== 204) {
          throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
        }
      })
    );
  }
}
