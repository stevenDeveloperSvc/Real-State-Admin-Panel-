import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@interface/Content';
import { LocationService } from '@services/location.service';
import { ProgressSpinnerComponent } from 'app/progress-spinner/progress-spinner.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule, TableRowSelectEvent } from 'primeng/table';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    TableModule,
    SkeletonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerComponent,
    ConfirmDialogModule
  ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  TotalPages!: number;
  Data!: Location[];
  Value: Location = {
    description: '',
    id: 0,
  };
  IsEditing: boolean = false;
  IsLoading: boolean = false;
  any: any;

  constructor(
    private Location: LocationService,
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
  Update(TypeObject: Location) {
    this.Location.ModifyLocation(TypeObject as any).subscribe({
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
  Save(TypeObject: Location) {
    this.Location.AddLocation(TypeObject as any).subscribe({
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
  CreateTypeObjet(): Location {
    const data = { ...this.Value };
    data.description = this.Value.description;
    return data;
  }
  ngOnInit(): void {
    this.LoadInfo();
  }
  LoadInfo() {
    this.IsLoading = true;
    this.Location.GetAllLocations().subscribe({
      next: (data) => {
        this.Data = data.locations;
        this.TotalPages = data.countItems as number;
      },
      error: () => {
        this.message.add({
          detail: 'Error while trying to get Locations',
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
      message: 'Are you sure you want to delete this Location?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProperty(e);
      },
    });
  }
  deleteProperty(e: Location) {
    this.IsLoading = true;
    this.Location.DeleteLocation(e.id as number).subscribe({
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
  editProperty(e: Location) {
    this.IsEditing = true;
    this.Value = { ...e };
  }
  onRowSelect(e: TableRowSelectEvent) {}
  loadProperties(e: any) {
    const page = e.first / e.rows + 1;
    this.Location.GetAllLocations(page).subscribe({
      next: (data) => {
        this.Data = data.locations;
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
