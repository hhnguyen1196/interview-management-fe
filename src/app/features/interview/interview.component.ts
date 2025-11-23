import {Component, OnInit, signal} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {Interview, InterviewOption, InterviewService} from './interview.service';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DatePickerModule} from 'primeng/datepicker';
import {DialogModule} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import {SelectModule} from 'primeng/select';
import {TextareaModule} from 'primeng/textarea';
import {ToastModule} from 'primeng/toast';
import {interviewStatusOptions, Option, statusOptions} from '../../utils/options';
import {toLookupMap} from '../../utils/helpers';
import {Tag} from 'primeng/tag';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [
    ButtonModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TableModule,
    ConfirmDialogModule,
    DatePickerModule,
    DialogModule,
    FormsModule,
    MultiSelectModule,
    SelectModule,
    TextareaModule,
    ToastModule,
    Tag
  ],
  templateUrl: './interview.component.html',
  providers: [MessageService, InterviewService, ConfirmationService]
})
export class InterviewComponent implements OnInit {

  constructor(
    private interviewService: InterviewService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.initData();
  }

  interviews = signal<Interview[]>([]);
  totalRecords = signal<number>(0);
  page = signal<number>(0);
  size = signal<number>(10);
  search = '';
  interview!: Interview;
  submitted = false;
  interviewDialog = false;
  statusOptions!: Option[];
  statusMap!: Record<string, string>;
  interviewOptions!: InterviewOption;
  originalInterview: { jobId: number | null; candidateId: number | null } = {
    jobId: null,
    candidateId: null
  };

  loadData() {
    this.interviewService.getInterviews({
      page: this.page(),
      size: this.size(),
      search: this.search,
    }).subscribe(data => {
      this.interviews.set(data.interviewList);
      this.totalRecords.set(data.totalElements)
    });
  }

  displayDelete(status: string) {
    return status === 'WAITING_FOR_INTERVIEW';
  }

  isWaitingForInterview(status: string) {
    return !status || status === 'WAITING_FOR_INTERVIEW';
  }

  onSearch(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.loadData();
  }

  openCreateInterview() {
    this.interview = {};
    this.submitted = false;
    this.interviewService.getInterviewOptions().subscribe({
      next: data => {
        this.interviewOptions = data;
        this.interviewDialog = true;
      }
    });
  }

  onPageChange(event: TableLazyLoadEvent) {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.size();
    const currentPage = Math.floor(first / rows);
    this.page.set(currentPage);
    this.size.set(rows);
    this.loadData();
  }

  saveInterview() {
    this.submitted = true;
    if (!(this.interview.jobId && this.interview.candidateId && this.interview.interviewerId
      && this.interview.recruiterId && this.interview.scheduleDate)) {
      return;
    }
    const isCreated = !this.interview.id
    const successMessage = isCreated ? 'Tạo lịch phỏng vấn thành công' : 'Cập nhật lịch phỏng vấn thành công';
    const errorMessage = isCreated ? 'Tạo lịch phỏng vấn thất bại' : 'Cập nhật lịch phỏng vấn thất bại';

    const payload: Interview = {
      ...this.interview,
      fromHour: this.interview.fromHourLabel
        ? this.interview.fromHourLabel.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false})
        : undefined,
      toHour: this.interview.toHourLabel
        ? this.interview.toHourLabel.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false})
        : undefined,
    };

    this.interviewService.saveInterview(payload).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'info',
            icon: 'pi-check-circle',
            summary: successMessage,
            life: 3000
          });
          this.search = ''
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
    this.interviewDialog = false;
    this.interview = {};
  }

  editInterview(id: number) {
    forkJoin({
      interview: this.interviewService.getInterviewById(id),
      options: this.interviewService.getInterviewOptions(id)
    }).subscribe({
      next: ({interview, options}) => {
        const [h1, m1] = interview.fromHour!.split(":").map(Number);
        const [h2, m2] = interview.toHour!.split(":").map(Number);
        const fromHourDate = new Date();
        fromHourDate.setHours(h1, m1, 0, 0);
        const toHourDate = new Date();
        toHourDate.setHours(h2, m2, 0, 0);
        this.interview = {
          ...interview,
          scheduleDate: new Date(interview.scheduleDate!),
          fromHourLabel: fromHourDate,
          toHourLabel: toHourDate
        };
        this.originalInterview = {
          jobId: interview.jobId ?? null,
          candidateId: interview.candidateId ?? null
        };
        this.interviewOptions = options;
        this.interviewDialog = true;
      }
    });
  }


  deleteCandidate(id: number) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa bản ghi này không?',
      header: 'Xác nhận xóa',
      acceptLabel: 'Xác nhận',
      rejectLabel: 'Hủy',
      accept: () => {
        this.interviewService.deleteCandidate(id).subscribe({
          next: () => {
            this.search = ''
            this.loadData();
            this.messageService.add({
              severity: 'info',
              icon: 'pi-check-circle',
              summary: 'Xóa lịch phỏng vấn thành công',
              life: 3000
            });
          },
          error: err => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              icon: 'pi-times-circle',
              summary: 'Xóa lịch phỏng vấn thất bại',
              life: 3000
            });
          }
        });
      },
    });
    this.interview = {};
  }

  getHeaderText() {
    return this.interview?.id ? 'CHI TIẾT LỊCH PHỎNG VẤN' : 'TẠO MỚI LỊCH PHỎNG VẤN';
  }

  hideDialog() {
    this.interview = {};
    this.interviewDialog = false;
    this.submitted = false;
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

  isChanged(): boolean {
    return this.interview.jobId !== this.originalInterview.jobId ||
      this.interview.candidateId !== this.originalInterview.candidateId;
  }

  initData() {
    this.statusOptions = interviewStatusOptions;
    this.statusMap = toLookupMap(this.statusOptions);
  }
}
