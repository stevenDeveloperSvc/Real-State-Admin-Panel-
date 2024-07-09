import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Detail, DetailDTO } from '@interface/Content';
import { DetailService } from '@services/detail.service';
import { ProgressSpinnerComponent } from 'app/progress-spinner/progress-spinner.component';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import {
  TableLazyLoadEvent,
  TableModule,
  TableRowSelectEvent,
} from 'primeng/table';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ConfirmDialogModule,
    SkeletonModule,
    ProgressSpinnerComponent,
    DropdownModule,
    TableModule,
  ],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss',
})
export class PropertyDetailsComponent implements OnInit {
  details!: Detail[];
  IsLoading: boolean = false;
  SelectedDetail: any = {
    detail: null,
    description: null,
  };
  TotalPages!: number;
  Data: DetailDTO[] = [];
  DataSliced: DetailDTO[] = [];
  constructor(
    private DetailService: DetailService,
    private Message: MessageService
  ) {}
  ngOnInit(): void {
    this.GetAllDetails();
  }
  OnSelectionChange() {}

  onInputChange() {}

  UpdateProperty() {
    throw new Error('Method not implemented.');
  }
  SaveProperty() {
    const NewDetail: DetailDTO = {
      id: this.SelectedDetail.detail.id,
      detail: this.SelectedDetail.detail.description,
      description: this.SelectedDetail.description,
    };
    this.Data = [...this.Data, NewDetail];
    this.loadProperties({ first: 0, rows: 4 }); // Actualizar la paginación después de guardar
    this.TotalPages = this.Data.length;

    console.log(this.DataSliced)
  }

  private GetAllDetails() {
    this.DetailService.GetAllDetails().subscribe({
      next: (value) => {
        this.details = value.details;
      },
      error: () => {
        this.ShowErrorMesage('Amenity');
      },
    });
  }
  private ShowErrorMesage(Message: string) {
    this.Message.add({
      detail: `An error ocurred while triying to get ${Message}`,
      summary: 'error',
      severity: 'error',
    });
  }

  confirmDeleteProperty(_t35: any) {}
  editProperty(_t35: any) {}
  loadProperties(event: any) {
    const page = event.first / event.rows;
    const startIndex = page * event.rows;
    const endIndex = startIndex + event.rows;

    this.DataSliced = this.Data.slice(startIndex, endIndex);
  }
  onRowSelect($event: TableRowSelectEvent) {}
}
