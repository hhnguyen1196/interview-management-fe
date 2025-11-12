import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {Column, ExportColumn, Job, JobService, Level, Skill} from './job.service';
import {Table, TableModule} from 'primeng/table';
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
import {toLookupMap} from '../../utils/common-utils';

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
    this.loadData();
  }

  @ViewChild('dt') dt!: Table;
  jobs = signal<Job[]>([]);
  totalRecords = signal<number>(0);
  page = signal<number>(0);
  size = signal<number>(10);
  job!: Job;
  submitted = false;
  jobDialog = false;
  multiselectSkill!: Skill[];
  levelOptions!: Level[];
  skillMap!: Record<string, string>;
  levelMap!: Record<string, string>;
  cols!: Column[];
  exportColumns!: ExportColumn[];

  openCreateJob() {
    this.job = {};
    this.submitted = false;
    this.jobDialog = true;
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  saveProduct() {
    this.submitted = true;

    if (!(this.job.title?.trim() && this.job.skills?.length)) {
      return;
    }

    if (this.job.id) {

      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Product Updated',
        life: 3000
      });
    } else {

      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Product Created',
        life: 3000
      });
    }
    this.messageService.add({
      severity: 'info',
      icon: 'pi-check-circle',
      summary: 'Tạo công việc thành công',
      life: 2000
    });
    this.jobDialog = false;
    this.job = {};
  }

  editJob(job: Job) {
    this.job = {...job};
    this.jobDialog = true;
  }

  deleteJob(product: Job) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa bản ghi này không?',
      header: 'Xác nhận xóa',
      accept: () => {
        this.jobs.set(this.jobs().filter((val) => val.id !== product.id));
        this.job = {};
        this.messageService.add({
          severity: 'info',
          icon: 'pi-check-circle',
          summary: 'Xóa công việc thành công',
          life: 2000
        });
      }
    });
  }

  hideDialog() {
    this.jobDialog = false;
    this.submitted = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getStatusSeverity(status: string) {
    switch (status) {
      case 'OPEN':
        return 'success';
      case 'CLOSED':
        return 'danger';
      case 'IN_PROGRESS':
        return 'info';
      case 'CANCELED':
        return 'secondary';
      default:
        return 'info';
    }
  }

  getSkillLabels(skills: string[] | null): string {
    return skills?.map(s => this.skillMap[s])?.join(', ') || '';
  }

  onPageChange(event: any) {
    this.page.set(event.first / event.rows);
    this.size.set(event.rows);
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

    this.multiselectSkill = [
      {label: 'Java', value: 'JAVA'},
      {label: 'NodeJs', value: 'NODE_JS'},
      {label: '.NET', value: 'DOT_NET'},
      {label: 'C++', value: 'CPP'},
      {label: 'Angular', value: 'ANGULAR'},
      {label: 'ReactJS', value: 'REACT_JS'},
      {label: 'VueJS', value: 'VUE_JS'},
      {label: 'Python', value: 'PYTHON'},
      {label: 'SQL', value: 'SQL'},
      {label: 'Business Analysis', value: 'BUSINESS_ANALYSIS'},
      {label: 'Docker', value: 'DOCKER'},
      {label: 'Git', value: 'GIT'}
    ];

    this.levelOptions = [
      {label: 'Fresher 1', value: 'FRESHER_1'},
      {label: 'Junior 2.1', value: 'JUNIOR_2_1'},
      {label: 'Junior 2.2', value: 'JUNIOR_2_2'},
      {label: 'Junior 2.3', value: 'JUNIOR_2_3'},
      {label: 'Senior 3.1', value: 'SENIOR_3_1'},
      {label: 'Senior 3.2', value: 'SENIOR_3_2'},
      {label: 'Leader', value: 'LEADER'}
    ];

    this.skillMap = toLookupMap(this.multiselectSkill);
    this.levelMap = toLookupMap(this.levelOptions);
  }

  loadData() {
    this.jobService.getJobs({
      page: this.page(),
      size: this.size(),
      search: ""
    }).subscribe(data => {
      this.jobs.set(data.jobList);
      this.totalRecords.set(data.totalElements)
    });
  }
}
