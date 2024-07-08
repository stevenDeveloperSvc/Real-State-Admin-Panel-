import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Detail } from '@interface/Content';
import { DetailService } from '@services/detail.service';
import { ProgressSpinnerComponent } from 'app/progress-spinner/progress-spinner.component';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { TableLazyLoadEvent, TableModule, TableRowSelectEvent } from 'primeng/table';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, 
    CommonModule, ConfirmDialogModule, SkeletonModule, 
    ProgressSpinnerComponent, DropdownModule, TableModule
  ],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss'
})
export class PropertyDetailsComponent implements OnInit {

  details!: Detail[];
  IsLoading: boolean = false;
  FormData: any = {
    Description: ''
  };
  TotalPages: number;
  Data: any[];

  constructor(private DetailService: DetailService, private Message: MessageService) { }

  OnSelectionChange() {
    throw new Error('Method not implemented.');
  }

  onInputChange() {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.GetAllDetails();
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


  confirmDeleteProperty(_t35: any) {
    throw new Error('Method not implemented.');
    }
    editProperty(_t35: any) {
    throw new Error('Method not implemented.');
    }
    loadProperties($event: TableLazyLoadEvent) {
    throw new Error('Method not implemented.');
    }
    onRowSelect($event: TableRowSelectEvent) {
    throw new Error('Method not implemented.');
    }

}
