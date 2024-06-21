import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { PropertyService } from '../../../../services/property.service';
import { Property, PropertyResponse } from '../../../../interface/Content';
import { MenuItem, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-content-property-list',
  standalone: true,
  imports: [TableModule, CommonModule, SkeletonModule, ContextMenuModule,ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './content-property-list.component.html',
  styleUrl: './content-property-list.component.scss',
})
export class ContentPropertyListComponent implements OnInit {

  Properties!: PropertyResponse;
  Data!: Property[];
  Page: number = 1;
  TotalPages: number = 0;
  IsLoading: boolean = false;
  constructor(
    private PropertyService: PropertyService,
    private Message: MessageService,
    private confirmationService: ConfirmationService,
    private route: Router
  ) {}
  onRowSelect(event: any) {
    console.log('Selected row data:', event.data);
  }

  editProperty(property: Property) {
    console.log('Edit property:', property);
    this.navigateToMaintenance(property.propertyId)
   
  }
  navigateToMaintenance(propertyId: number): void {
    this.route.navigate(['/main/property/maintenance', propertyId]);
  }
  deleteProperty(property: Property) {
    console.log('Delete property:', property);
    // Implementa la lógica para eliminar aquí
  }


  ngOnInit(): void {
    this.PropertyService.GetAllProperties(this.Page ).subscribe({
      next: ({ data }) => {
        this.Data = data;
      },
      error: () => {
        this.Message.add({
          detail: 'An error ocurred',
          severity: 'warn',
          summary: 'warn',
          
        });
      },
    });

  }

  confirmDeleteProperty(property: Property) {
   // this.propertyToDelete = property;
   console.log(property)
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this property?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    //    this.deleteProperty();
      }
    });
  }

  loadProperties(event: any) {
    this.IsLoading = true;
    const page = (event.first / event.rows) + 1;


    this.PropertyService.GetAllProperties(page).subscribe(
      {
        next: (data) => {
          this.Data = data.data;
          this.TotalPages = data.info.countItems;
          this.IsLoading = false;
        },
        error: () => {
          this.Message.add({
            detail: 'An error ocurred',
            severity: 'error',
            summary: 'error',
          });
          this.IsLoading = false;
        },
      }
      // (response: PropertyResponse) => {
      //   this.properties = response.data;
      //   this.totalRecords = response.info.countItems;
      //   this.loading = false;
      // },
      // (error) => {
      //   console.error(error);
      //   this.loading = false;
      // }
    );
  }
}
