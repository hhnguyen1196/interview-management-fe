import {inject, Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Pagination} from '../../shared/pagination';
import {map, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

export interface Interview {
  id?: number;
  title?: string;
  jobId?: number;
  candidateId?: number;
  candidateName?: string;
  interviewerId?: number;
  interviewerName?: string;
  recruiterId?: number;
  recruiterName?: string;
  schedule?: string;
  scheduleDate?: Date;
  fromHour?: string;
  fromHourLabel?: Date;
  toHour?: string;
  toHourLabel?: Date;
  location?: string;
  meetingId?: string;
  note?: string;
  status?: string;
  notes?: string;
}

export interface InterviewList {
  interviewList: Interview[];
  totalElements: number;
}

export interface Job {
  id: number;
  title: string;
}

export interface Candidate {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
}

export interface InterviewOption {
  jobList: Job[];
  candidateList: Candidate[];
  interviewerList: User[];
  recruiterList: User[]
}

@Injectable()
export class InterviewService {
  private apiService = inject(ApiService);

  getInterviews(data: Pagination): Observable<InterviewList> {
    const params = {
      page: data.page,
      size: data.size,
      search: data.search
    };
    return this.apiService.get<InterviewList>(environment.endpoints.interviews, params).pipe(
      map(response => {
        if (response.status === 200) {
          return response.body!;
        }
        throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
      })
    );
  }

  getInterviewOptions(id: number = '' as unknown as number): Observable<InterviewOption> {
    const params = {
      id: id
    };
    return this.apiService.get<InterviewOption>(`${environment.endpoints.interviews}/options`, params).pipe(
      map(response => {
        if (response.status === 200) {
          return response.body!;
        }
        throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
      })
    );
  }

  saveInterview(data: Interview): Observable<void> {
    return this.apiService.post<void, Interview>(environment.endpoints.interviews, data).pipe(
      map(response => {
        if (!(response.status === 201 || response.status === 204)) {
          throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
        }
      })
    );
  }

  getInterviewById(id: number): Observable<Interview> {
    return this.apiService.get<Interview>(`${environment.endpoints.interviews}/${id}`).pipe(
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
