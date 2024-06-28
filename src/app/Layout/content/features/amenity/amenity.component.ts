import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Amenity   } from '@interface/Content';
import { AmenityService } from '@services/amenity.service';
import { ProgressSpinnerComponent } from 'app/progress-spinner/progress-spinner.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule, TableRowSelectEvent } from 'primeng/table';

@Component({
  selector: 'app-amenity',
  standalone: true,
  imports: [    TableModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SkeletonModule,
    ProgressSpinnerComponent,
    ConfirmDialogModule],
  templateUrl: './amenity.component.html',
  styleUrl: './amenity.component.scss'
})
export class AmenityComponent {
  TotalPages!: number;
  Data!: Amenity[];
  Value: Amenity = {
    description: '',
    id: 0,
  };
  IsEditing: boolean = false;
  IsLoading: boolean = false;
  any: any;

  constructor(
    private Amenity: AmenityService,
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
  Update(TypeObject: Amenity) {
    this.Amenity.ModifyAmenity(TypeObject).subscribe({
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
  Save(TypeObject: Amenity) {
    this.Amenity.AddAmenity(TypeObject).subscribe({
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
  CreateTypeObjet(): Amenity {
    const data = { ...this.Value };
    data.description = this.Value.description;
    return data;
  }
  ngOnInit(): void {
    this.LoadInfo();
  }
  LoadInfo() {
    this.IsLoading = true;
    this.Amenity.GetAllAmenities().subscribe({
      next: (data) => {
        this.Data = data.amenities;
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
  deleteProperty(e: Amenity) {
    this.IsLoading = true;
    this.Amenity.DelteAmenity(e.id as number).subscribe({
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
  editProperty(e: Amenity) {
    this.IsEditing = true;
    this.Value = { ...e };
  }
  onRowSelect(e: TableRowSelectEvent) {}
  loadProperties(e: any) {
    const page = e.first / e.rows + 1;
    this.Amenity.GetAllAmenities(page).subscribe({
      next: (data) => {
        this.Data = data.amenities;
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
