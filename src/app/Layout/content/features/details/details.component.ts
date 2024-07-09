import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Detail } from '@interface/Content';
import { DetailService } from '@services/detail.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule, TableRowSelectEvent } from 'primeng/table';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule, TableModule, ConfirmDialogModule, SkeletonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  TotalPages!: number;
  Data!: Detail[];
  Value: Detail = {
    description: '',
    id : 0,
  };
  IsEditing: boolean = false;
  IsLoading: boolean = false;
  any: any;

  constructor(
    private Detail: DetailService,
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
    this.Value.description = '';
  }
  Update(TypeObject: Detail) {
    this.Detail.UpdateDetail(TypeObject as any).subscribe({
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
      complete: () => {
        this.ClearTypes();
        this.LoadInfo();
        this.IsEditing = false;
      },
    });
  }
  Save(TypeObject: Detail) {
    this.Detail.AddDetail(TypeObject as any).subscribe({
      next: (value) => {
        this.message.add({
          detail: value.value,
          summary: 'success',
          severity: 'success',
        });
      },
      error: (e) => {
        this.message.add({
          detail: 'Error while trying to save',
          summary: 'error',
          severity: 'error',
        });
      },
      complete: () => {
        this.ClearTypes();
        this.LoadInfo();
        this.IsEditing = false;
      },
    });
  }
  CreateTypeObjet(): Detail {
    const data = { ...this.Value };
    data.description = this.Value.description;
    return data;
  }
  ngOnInit(): void {
    this.LoadInfo();
  }
  LoadInfo() {
    this.IsLoading = true;
    this.Detail.GetAllDetails().subscribe({
      next: (data) => {
        this.Data = data.details;
        console.log(data)
        this.TotalPages = data.countItems as number;
      },
      error: () => {
        this.message.add({
          detail: 'Error while trying to get details',
          summary: 'error',
          severity: 'error',
        });
      },
      complete: () => {
        this.IsLoading = false;
      },
    });
  }
  confirmDeleteProperty(e: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this detail?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProperty(e);
      },
    });
  }
  deleteProperty(e: Detail) {
    this.IsLoading = true;
    this.Detail.DeleteDetail(e.id as number).subscribe({
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
  editProperty(e: Detail) {
    this.IsEditing = true;
    this.Value = { ...e };
  }
  onRowSelect(e: TableRowSelectEvent) {}
  loadProperties(e: any) {
    const page = e.first / e.rows + 1;
    this.Detail.GetAllDetails(page).subscribe({
      next: (data) => {
        this.Data = data.details ;
        this.TotalPages = data.countItems as number;
        this.IsLoading = false;
      },
      error: () => {
        this.message.add({
          detail: 'Error while trying to get details',
          summary: 'error',
          severity: 'error',
        });
      },
    });
  }
}
