import {inject, Injectable} from '@angular/core';
import {Option} from '../../utils/common-utils';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ApiService} from '../../services/api.service';

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

export interface Job {
  id?: string;
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

  getJobs(request: JobListRequest): Observable<JobList> {
    const params = {
      page: request.page,
      size: request.size,
      search: request.search
    };
    return this.apiService.get<JobList>(environment.endpoints.jobs, params);
  }
}

