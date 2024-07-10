import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Detail, DetailDTO } from '@interface/Content';
import { DetailService } from '@services/detail.service';
import { PropertyService } from '@services/property.service';
import { ProgressSpinnerComponent } from 'app/progress-spinner/progress-spinner.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import {
  TableModule,
  TablePageEvent,
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
    TableModule
  ],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss',
})
export class PropertyDetailsComponent implements OnInit {
  @Input() OnEditingMode: boolean = false;
  @Output() selectionChange = new EventEmitter<{ details: any }>();

  details!: Detail[];
  IsLoading: boolean = false;
  IsEditing: boolean = false;
  SelectedDetail: any = {
    detail: null,
    description: null,
  };
  TotalPages!: number;
  Data: DetailDTO[] = [];
  DataSliced: DetailDTO[] = [];
  TempId: number = -10000000;
  first: number | null | undefined;

  constructor(
    private DetailService: DetailService,
    private Message: MessageService,
    private confirmationService: ConfirmationService,
    private Property : PropertyService
  ) { }

  ngOnInit(): void {
    this.GetAllDetails();

    if(!this.OnEditingMode) return;
    this.Property.GetPropertyById().subscribe({
      next:({ responseDTO })=>{
          this.Data = responseDTO.details;
          this.TotalPages = this.Data.filter(a => a.active == 1).length;
          this.first = 0;
          this.loadProperties({ first: 0, rows: 4 });
      }
    });
  }

  OnSelectionChange() { }

  onInputChange() { }

  pageChange(e: TablePageEvent) {
    this.first = e.first;
    this.loadProperties(e); // Asegurarse de cargar los datos de la página correcta
  }

  SaveProperty() {
    if (this.IsEditing) {
      this.Update();
    } else {
      this.Add();
    }
    this.onSelectionChange();
    this.ClearInfo();
    this.loadProperties({ first: 0, rows: 4 });
    this.TotalPages = this.Data.filter(a => a.active == 1).length;
  }

  Add() {
    const NewDetail: DetailDTO = {
      detailid: this.TempId++,
      id: this.SelectedDetail.detail.id,
      detail: this.SelectedDetail.detail.description,
      description: this.SelectedDetail.description,
      active: 1
    };
    this.Data = [...this.Data, NewDetail];
  }

  Update() {
    const { detailid, detail, description } = this.SelectedDetail;  
    const data = this.Data.filter(a => a.active == 1).find(a => a.detailid == detailid);

    if (data) {
      data.description = description;
      data.detailid = detailid;
      data.detail = detail.description;
      data.id = detail.id;
    }
    this.ClearInfo();
    this.loadProperties({ first: 0, rows: 4 });
    this.TotalPages = this.Data.filter(a => a.active == 1).length;
  }

  ClearInfo() {
    this.SelectedDetail = {
      detail: null,
      description: null,
      detailid: null
    };
    this.IsEditing = false;
    this.first = 0;
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
      detail: `An error ocurred while trying to get ${Message}`,
      summary: 'Error',
      severity: 'error',
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

  deleteProperty(e: DetailDTO) {
    if (!e.detailid) return;

    if (e.detailid < 0) {
      this.Data = this.Data.filter(a => a.detailid !== e.detailid);
    } else {
      const getCurrentDetail = this.Data.find(a => a.detailid == e.detailid);
      if (getCurrentDetail) {
        getCurrentDetail.active = 0; 
      }
    }

    this.onSelectionChange();
    this.ClearInfo();
    this.loadProperties({ first: 0, rows: 4 });
    this.TotalPages = this.Data.filter(a => a.active == 1).length;
    this.IsEditing = false;
  }

  editProperty(value: any) {
    this.IsEditing = true;
    this.SelectedDetail = {
      detail: {
        id: value.id,
        description: value.detail
      },
      description: value.description,
      detailid: value.detailid
    };
  }

  loadProperties(event: any) {
    const page = event.first / event.rows;
    const startIndex = page * event.rows;
    const endIndex = startIndex + event.rows;

    this.DataSliced = this.Data.filter(a => a.active == 1).slice(startIndex, endIndex);
  }

  onSelectionChange() {
    this.selectionChange.emit({ details: this.Data });
  }

  onRowSelect(event: TableRowSelectEvent) { }
}
