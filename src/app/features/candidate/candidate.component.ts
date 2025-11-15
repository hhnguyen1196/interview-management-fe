import {Component, OnInit, signal} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {Candidate, CandidateService} from './candidate.service';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {ConfirmationService, MessageService} from 'primeng/api';
import {
  candidateStatusOptions,
  genderOptions,
  levelOptions,
  Option,
  positionOptions,
  skillOptions
} from '../../utils/options';
import {toLookupMap} from '../../utils/helpers';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DatePickerModule} from 'primeng/datepicker';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectModule} from 'primeng/select';
import {TextareaModule} from 'primeng/textarea';
import {ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [
    ButtonModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TableModule,
    TagModule,
    ConfirmDialogModule,
    DatePickerModule,
    DialogModule,
    MultiSelectModule,
    ReactiveFormsModule,
    SelectModule,
    TextareaModule,
    ToastModule,
    FormsModule,
    FileUploadModule
  ],
  templateUrl: './candidate.component.html',
  providers: [MessageService, CandidateService, ConfirmationService]
})
export class CandidateComponent implements OnInit {

  constructor(
    private candidateService: CandidateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.initData();
  }

  candidates = signal<Candidate[]>([]);
  totalRecords = signal<number>(0);
  page = signal<number>(0);
  size = signal<number>(10);
  search = signal<string>('');
  candidate!: Candidate;
  submitted = false;
  candidateDialog = false;
  statusOptions!: Option[];
  positionOptions!: Option[];
  genderOptions!: Option[];
  levelOptions!: Option[];
  multiselectSkill!: Option[];
  statusMap!: Record<string, string>;
  positionMap!: Record<string, string>;
  genderMap!: Record<string, string>;
  levelMap!: Record<string, string>;
  skillMap!: Record<string, string>;

  loadData() {
    this.candidateService.getCandidates({
      page: this.page(),
      size: this.size(),
      search: this.search(),
    }).subscribe(data => {
      this.candidates.set(data.candidateList);
      this.totalRecords.set(data.totalElements)
    });
  }

  onSearch(event: Event) {
    this.search.set((event.target as HTMLInputElement).value);
    this.loadData();
  }

  onFileSelect(event: any) {
    this.candidate.cvAttachment = event.files[0];
    this.candidate.filename = this.candidate.cvAttachment?.name
    this.candidate.cvFilePath = URL.createObjectURL(this.candidate.cvAttachment!);
  }

  previewPdf() {
    if (this.candidate.cvFilePath) {
      window.open(this.candidate.cvFilePath, '_blank');
    }
  }

  previewPdfFromServer() {
    if (this.candidate.cvFilePath) {
      window.open(`${environment.apiUrl}/${environment.endpoints.download}${this.candidate.cvFilePath}`,
        '_blank');
    }
  }

  getHeaderText() {
    return this.candidate?.id ? 'CHI TIẾT ỨNG VIÊN' : 'TẠO MỚI ỨNG VIÊN';
  }

  openCreateCandidate() {
    this.candidate = {};
    this.submitted = false;
    this.candidateDialog = true;
  }

  hideDialog() {
    this.candidate = {};
    this.candidateDialog = false;
    this.submitted = false;
  }

  editCandidate(id: number) {
    this.candidateService.getCandidateById(id).subscribe({
      next: data => {
        this.candidate = {
          ...data,
          dateOfBirth: new Date(data.dateOfBirth!),
        };
        this.candidateDialog = true;
      }
    })
  }

  saveCandidate() {
    this.submitted = true;
    if (!(this.candidate.fullName?.trim() && this.candidate.email?.trim() && this.candidate.gender
      && this.candidate.position && this.candidate.skills?.length && this.candidate.level)) {
      return;
    }
    const isCreated = !this.candidate.id
    const successMessage = isCreated ? 'Tạo ứng viên thành công' : 'Cập nhật ứng viên thành công';
    const errorMessage = isCreated ? 'Tạo ứng viên thất bại' : 'Cập nhật ứng viên thất bại';
    this.candidateService.saveCandidate(this.candidate).subscribe({
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
    this.candidateDialog = false;
    this.candidate = {};
  }

  deleteCandidate(id: number) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa bản ghi này không?',
      header: 'Xác nhận xóa',
      acceptLabel: 'Xác nhận',
      rejectLabel: 'Hủy',
      accept: () => {
        this.candidateService.deleteCandidate(id).subscribe({
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
    this.candidate = {};
  }

  onPageChange(event: TableLazyLoadEvent) {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.size();
    const currentPage = Math.floor(first / rows);
    this.page.set(currentPage);
    this.size.set(rows);
    this.loadData();
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

  initData() {
    this.positionOptions = positionOptions;
    this.statusOptions = candidateStatusOptions;
    this.genderOptions = genderOptions;
    this.levelOptions = levelOptions;
    this.multiselectSkill = skillOptions;
    this.positionMap = toLookupMap(this.positionOptions);
    this.statusMap = toLookupMap(this.statusOptions);
    this.genderMap = toLookupMap(this.genderOptions);
    this.levelMap = toLookupMap(this.levelOptions);
    this.skillMap = toLookupMap(this.multiselectSkill);
  }
}
