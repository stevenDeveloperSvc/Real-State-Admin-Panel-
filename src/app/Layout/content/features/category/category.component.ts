import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Category } from '@interface/Content';
import { CategoryService } from '@services/category.service';
import { ProgressSpinnerComponent } from 'app/progress-spinner/progress-spinner.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule, TableRowSelectEvent } from 'primeng/table';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SkeletonModule,
    ProgressSpinnerComponent,
    ConfirmDialogModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  TotalPages!: number;
  Data!: Category[];
  Value: Category = {
    description: '',
    id: 0,
  };
  IsEditing: boolean = false;
  IsLoading: boolean = false;
  any: any;

  constructor(
    private Category: CategoryService,
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
  Update(TypeObject: Category) {
    this.Category.ModifyCategory(TypeObject).subscribe({
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
  Save(TypeObject: Category) {
    this.Category.AddCategory(TypeObject).subscribe({
      next: (value) => {
        this.message.add({
          detail: value.value,
          summary: 'success',
          severity: 'success',
        });
      },
      error: (e) => {
        console.log(e);
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
  CreateTypeObjet(): Category {
    const data = { ...this.Value };
    data.description = this.Value.description;
    return data;
  }
  ngOnInit(): void {
    this.LoadInfo();
  }
  LoadInfo() {
    this.IsLoading = true;
    this.Category.GetAllCategories().subscribe({
      next: (data) => {
        this.Data = data.categories;
        this.TotalPages = data.countItems as number;
      },
      error: () => {
        this.message.add({
          detail: 'Error while trying to get types',
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
      message: 'Are you sure you want to delete this Category?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProperty(e);
      },
    });
  }
  deleteProperty(e: Category) {
    this.IsLoading = true;
    this.Category.DeleteCategory(e.id as number).subscribe({
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
  editProperty(e: Category) {
    this.IsEditing = true;
    this.Value = { ...e };
  }
  onRowSelect(e: TableRowSelectEvent) {}
  loadProperties(e: any) {
    const page = e.first / e.rows + 1;
    this.Category.GetAllCategories(page).subscribe({
      next: (data) => {
        this.Data = data.categories;
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
    });
  }
}
