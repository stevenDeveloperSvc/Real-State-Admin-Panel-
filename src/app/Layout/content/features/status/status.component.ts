import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Status } from '@interface/Content';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { StatusService } from '@services/status.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerComponent } from 'app/progress-spinner/progress-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-status',
  standalone: true,
  imports: [
    TableModule,
    ConfirmDialogModule,
    SkeletonModule,
    CommonModule,
    ProgressSpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent {
  TotalPages!: number;
  Data!: Status[];
  Value: Status = {
    status: '',
    statusId: 0,
  };
  IsEditing: boolean = false;
  IsLoading: boolean = false;
  any: any;

  constructor(
    private Status: StatusService,
    private message: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  SaveTypes() {
    const TypeObject = this.CreateTypeObjet();
    
    if (this.IsEditing) {
      this.Update(TypeObject);
    } else {
      this.Save(TypeObject);
    }
  }
  ClearTypes() {
    this.Value.status = '';
  }
  Update(TypeObject: Status) {
    this.Status.ModifyStatus(TypeObject).subscribe({
      next: (value) => {
        this.message.add({
          detail: value.value,
          summary: 'success',
          severity: 'success',
        });
      },
      error: () => {
        this.message.add({
          detail: 'Error while trying to save',
          summary: 'error',
          severity: 'error',
        });
      },
      complete:()=>{
        this.ClearTypes();
        this.LoadInfo();
        this.IsEditing = false;
      }
    });

  }
  Save(TypeObject: Status) {
    this.Status.AddStatus(TypeObject).subscribe({
      next: (value) => {
        this.message.add({
          detail: value.value,
          summary: 'success',
          severity: 'success',
        });
      },
      error: (e) => {
        console.log(e)
        this.message.add({
          detail: 'Error while trying to save',
          summary: 'error',
          severity: 'error',
        
        } );      
      },
      complete:()=>{
        this.ClearTypes();
        this.LoadInfo();
        this.IsEditing = false;
      }
    });
  }
  CreateTypeObjet(): Status {
    const data = { ...this.Value };
    data.status = this.Value.status;
    return data;
  }
  ngOnInit(): void {
    this.LoadInfo();
  }
  LoadInfo() {
    this.IsLoading = true;
    this.Status.GetAllStatusByPage().subscribe({
      next: (data) => {
        this.Data = data.status;
        this.TotalPages = data.countItems as number;
      },
      error: () => {
        this.message.add({
          detail: 'Error while trying to get types',
          summary: 'error',
          severity: 'error',
        });
      },
      complete:()=>{
      this.IsLoading = false;

      }
    });
  }
  confirmDeleteProperty(e: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Status?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProperty(e);
      },
    });
  }
  deleteProperty(e: Status) {
    this.IsLoading = true;
    this.Status.Deletestatus(e.statusId as number).subscribe({
      next: (value) => {
        this.message.add({
          detail: value.value,
          summary: 'success',
          severity: 'success',
        });
        this.LoadInfo();
      },
      error: (value) => {
        this.message.add({
          detail: value.value,
          summary: 'error',
          severity: 'error',
        });
      },
      complete: () => {
        this.IsLoading = false;
      },
    });
  }
  editProperty(e: Status) {
    this.IsEditing = true;
    this.Value = { ...e };
  }
  onRowSelect(e: TableRowSelectEvent) {}
  loadProperties(e: any) {
    this.IsLoading = true;
    const page = e.first / e.rows + 1;
    this.Status.GetAllStatusByPage(page).subscribe({
      next: (data) => {
        this.Data = data.status;
        this.TotalPages = data.countItems as number;
        this.IsLoading = false;
      },
      error: () => {
        this.message.add({
          detail: 'Error while trying to get types',
          summary: 'error',
          severity: 'error',
        });
      },
      complete:()=>{
        this.IsLoading= false;
      }
    });
  }
}
