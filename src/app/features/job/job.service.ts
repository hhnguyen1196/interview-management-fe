import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ApiService} from '../../services/api.service';
import {Option} from '../../utils/options';

export interface Pagination {
  page: number;
  size: number;
}

export interface JobListRequest extends Pagination {
  search: string;
}

export interface Skill extends Option {
}

export interface Level extends Option {
}

export interface JobStatus extends Option {
}

export interface Job {
  id?: number;
  title?: string;
  skills?: string[] | null;
  level?: string;
  salary?: string;
  startDate?: Date;
  endDate?: Date;
  workingAddress?: string;
  description?: string;
  status?: string;
}

export interface JobList {
  jobList: Job[],
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
export class JobService {
  private apiService = inject(ApiService);

  getJobs(data: JobListRequest): Observable<JobList> {
    const params = {
      page: data.page,
      size: data.size,
      search: data.search
    };
    return this.apiService.get<JobList>(environment.endpoints.jobs, params).pipe(
      map(response => {
        if (response.status === 200) {
          return response.body!;
        }
        throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
      })
    );
  }

  saveJob(data: Job): Observable<void> {
    return this.apiService.post<void, Job>(environment.endpoints.jobs, data).pipe(
      map(response => {
        if (!(response.status === 201 || response.status === 204)) {
          throw new Error(`Unexpected status: ${response.status}, Message: ${response.body ?? 'No details'}`);
        }
      })
    );
  }

  getJobById(id: number): Observable<Job> {
    return this.apiService.get<Job>(`${environment.endpoints.jobs}/${id}`).pipe(
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

