import {Component, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {Toolbar} from 'primeng/toolbar';
import {Interview, InterviewService} from './interview.service';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [
    Button,
    Toolbar,
    IconField,
    InputIcon,
    InputText,
    TableModule
  ],
  templateUrl: './interview.component.html',
  providers: [MessageService, InterviewService, ConfirmationService]
})
export class InterviewComponent {

  constructor(
    private interviewService: InterviewService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  interviews = signal<Interview[]>([]);
  totalRecords = signal<number>(0);
  page = signal<number>(0);
  size = signal<number>(10);
  search = signal<string>('');
  interview!: Interview;
  submitted = false;
  candidateDialog = false;

  loadData() {
    // this.candidateService.getCandidates({
    //   page: this.page(),
    //   size: this.size(),
    //   search: this.search(),
    // }).subscribe(data => {
    //   this.candidates.set(data.candidateList);
    //   this.totalRecords.set(data.totalElements)
    // });
  }

  onSearch(event: Event) {
    this.search.set((event.target as HTMLInputElement).value);
    this.loadData();
  }

  openCreateInterview() {
    this.interview = {};
    this.submitted = false;
    this.candidateDialog = true;
  }

  onPageChange(event: TableLazyLoadEvent) {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.size();
    const currentPage = Math.floor(first / rows);
    this.page.set(currentPage);
    this.size.set(rows);
    this.loadData();
  }

  editInterview(id: number) {
    this.interviewService.getCandidateById(id).subscribe({
      next: data => {
        this.interview = {
          ...data,
          dateOfBirth: new Date(data.dateOfBirth!),
        };
        this.candidateDialog = true;
      }
    })
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
    this.interview = {};
  }

}
