import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {Column, ExportColumn, Job, JobService, JobStatus, Level, Skill} from './job.service';
import {Table, TableLazyLoadEvent, TableModule} from 'primeng/table';
import {ConfirmationService, MessageService} from 'primeng/api';
import {IconField, IconFieldModule} from 'primeng/iconfield';
import {InputIcon, InputIconModule} from 'primeng/inputicon';
import {CommonModule} from '@angular/common';
import {TagModule} from 'primeng/tag';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {TextareaModule} from 'primeng/textarea';
import {SelectModule} from 'primeng/select';
import {InputNumberModule} from 'primeng/inputnumber';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {DatePickerModule} from 'primeng/datepicker';
import {ToastModule} from 'primeng/toast';
import {toLookupMap} from '../../utils/helpers';
import {jobLevelOptions, jobSkillOptions, jobStatusOptions} from '../../utils/options';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [
    Toolbar,
    Button,
    TableModule,
    IconField,
    InputIcon,
    CommonModule,
    TagModule,
    InputTextModule,
    DialogModule,
    FormsModule,
    TextareaModule,
    SelectModule,
    InputNumberModule,
    RadioButtonModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule,
    MultiSelectModule,
    DatePickerModule,
    ToastModule
  ],
  templateUrl: './job.component.html',
  providers: [MessageService, JobService, ConfirmationService]
})
export class JobComponent implements OnInit {
  constructor(
    private jobService: JobService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.initData();
  }

  @ViewChild('dt') dt!: Table;
  jobs = signal<Job[]>([]);
  totalRecords = signal<number>(0);
  page = signal<number>(0);
  size = signal<number>(10);
  search = signal<string>('');
  job!: Job;
  submitted = false;
  jobDialog = false;
  multiselectSkill!: Skill[];
  levelOptions!: Level[];
  statusOptions!: JobStatus[];
  skillMap!: Record<string, string>;
  levelMap!: Record<string, string>;
  jobMap!: Record<string, string>;
  cols!: Column[];
  exportColumns!: ExportColumn[];

  loadData() {
    this.jobService.getJobs({
      page: this.page(),
      size: this.size(),
      search: this.search(),
    }).subscribe(data => {
      this.jobs.set(data.jobList);
      this.totalRecords.set(data.totalElements)
    });
  }

  getHeaderText() {
    return this.job?.id ? 'CHI TIẾT CÔNG VIỆC' : 'TẠO MỚI CÔNG VIỆC';
  }

  onSearch(event: Event) {
    this.search.set((event.target as HTMLInputElement).value);
    this.loadData();
  }

  openCreateJob() {
    this.job = {};
    this.submitted = false;
    this.jobDialog = true;
  }

  hideDialog() {
    this.job = {};
    this.jobDialog = false;
    this.submitted = false;
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  editJob(id: number) {
    this.jobService.getJobById(id).subscribe({
      next: data => {
        this.job = {
          ...data,
          startDate: new Date(data.startDate!),
          endDate: new Date(data.endDate!),
        };
        this.jobDialog = true;
      }
    })
  }

  saveJob() {
    this.submitted = true;
    if (!(this.job.title?.trim() && this.job.skills?.length && this.job.level && this.job.startDate
      && this.job.endDate && this.job.workingAddress?.trim())) {
      return;
    }
    const isCreated = !this.job.id
    const successMessage = isCreated ? 'Tạo công việc thành công' : 'Cập nhật công việc thành công';
    const errorMessage = isCreated ? 'Tạo công việc thất bại' : 'Cập nhật công việc thất bại';
    this.jobService.saveJob(this.job).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'info',
            icon: 'pi-check-circle',
            summary: successMessage,
            life: 3000
          });
          this.loadData();
        },
        error: err => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            icon: 'pi-times-circle',
            summary: errorMessage,
            life: 3000
          });
        }
      }
    )
    this.jobDialog = false;
    this.job = {};
  }

  deleteJob(id: number) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa bản ghi này không?',
      header: 'Xác nhận xóa',
      acceptLabel: 'Xác nhận',
      rejectLabel: 'Hủy',
      accept: () => {
        this.jobService.deleteJob(id).subscribe({
          next: () => {
            this.loadData();
            this.messageService.add({
              severity: 'info',
              icon: 'pi-check-circle',
              summary: 'Xóa công việc thành công',
              life: 3000
            });
          },
          error: err => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              icon: 'pi-times-circle',
              summary: 'Xóa công việc thất bại',
              life: 3000
            });
          }
        });
      },
    });
    this.job = {};
  }

  getStatusSeverity(status: string) {
    switch (status) {
      case 'OPEN':
        return 'success';
      case 'CLOSED':
        return 'danger';
      default:
        return 'info';
    }
  }

  getSkillLabels(skills: string[] | null): string {
    return skills?.map(s => this.skillMap[s])?.join(', ') || '';
  }

  onPageChange(event: TableLazyLoadEvent) {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.size();
    const currentPage = Math.floor(first / rows);
    this.page.set(currentPage);
    this.size.set(rows);
    this.loadData();
  }

  initData() {
    this.cols = [
      {field: 'title', header: 'Tiêu đề'},
      {field: 'skills', header: 'Kỹ năng'},
      {field: 'level', header: 'Trình độ'},
      {field: 'status', header: 'Trạng thái'}
    ];

    this.exportColumns = this.cols.map((col) => ({title: col.header, dataKey: col.field}));

    this.multiselectSkill = jobSkillOptions;
    this.levelOptions = jobLevelOptions;
    this.statusOptions = jobStatusOptions;

    this.skillMap = toLookupMap(this.multiselectSkill);
    this.levelMap = toLookupMap(this.levelOptions);
    this.jobMap = toLookupMap(this.statusOptions);
  }
}
