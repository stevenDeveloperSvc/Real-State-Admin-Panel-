import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerComponent } from '../../../../progress-spinner/progress-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PropertyBasicInfoEvent,
  PropertyDescriptionEvent,
  PropertyResponseInfo,
  PropertyShortDescriptionEvent,
} from '@interface/Content';
import { MessageService, SelectItem } from 'primeng/api';
import { PropertyShortDescriptionComponent } from './property-short-description/property-short-description.component';
import { PropertyBasicInfoComponent } from './property-basic-info/property-basic-info.component';
import { PropertyDescriptionComponent } from './property-description/property-description.component';
import { PropertyImagesComponent } from './property-images/property-images.component';
import { PropertyService } from '@services/property.service';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { PropertyDetailsComponent } from './property-details/property-details.component';

@Component({
  selector: 'app-content-property-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    PropertyBasicInfoComponent,
    PropertyShortDescriptionComponent,
    PropertyDescriptionComponent,
    PropertyImagesComponent,
    PropertyDetailsComponent
  ],
  templateUrl: './content-property-maintenance.component.html',
  styleUrl: './content-property-maintenance.component.scss',
})
export class ContentPropertyMaintenanceComponent implements OnInit {
  PropertyId: null | number = 0;
  IsLoading: boolean = false;
  value!: any;
  PropertyInfo!: PropertyResponseInfo;
  IsEditiingProperty: boolean = false;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(
    private Property: PropertyService,
    private Message: MessageService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.PropertyId = Number(params.get('propertyId?'));
    });
    console.log('Loaded!!')
  }

  handlePropertyShortDescriptionSelectionChange(
    e: PropertyShortDescriptionEvent
  ) {
    this.value = { ...this.value, ...e };
  }
  handlePropertySelectionSelectionChange(e: PropertyBasicInfoEvent) {
    this.value = { ...this.value, ...e };
  }
  handlePropertyDescription(e: PropertyDescriptionEvent) {
    this.value = { ...this.value, ...e };
  }

  handleSelectionChange(e: PropertyBasicInfoEvent) {
    this.value = { ...this.value, ...e };
  }

  handlePropertyImages(e: { images: SelectItem<any>[] }) {
    const simplifiedImages = {
      images: e.images.map((image) => image.value),
    };
    this.value = { ...this.value, ...simplifiedImages };
  }
  ngOnInit(): void {
    this.IsEditiingProperty = false;
    if (
      this.PropertyId !== null &&
      this.PropertyId !== undefined &&
      this.PropertyId !== 0
    ) {
      this.IsEditiingProperty = true;

      this.Property.GetPropertyById(this.PropertyId, true).subscribe({
        next: () => {
          this.Message.add({
            detail: 'Property Info Loaded succesfully',
            severity: 'success',
            summary: 'success',
          });
        },
        error: () => {
          this.Message.add({
            detail: 'Error whily fetching Property Info',
            severity: 'error',
            summary: 'error',
          });
        },
      });
    }
  }
  UpdateProperty() {}
  SaveProperty() {
    const formData = this.GenerateFormDataFromControls();

    if (this.IsEditiingProperty) {
      this.Property.UpdateProperty(formData).subscribe({
        next: (value) => {
          this.Message.add({
            detail: 'Property Updated',
            severity: 'success',
            summary: 'sucess',
          });
        },
        error: (value) => {
          this.Message.add({
            detail: `${value.error.value ?? 'Error while triying to update'}`,
            severity: 'error',
            summary: 'error',
          });
        },
      });
      return;
    }

    this.Property.AddProperty(formData).subscribe({
      next: (value) => {
        this.Message.add({
          detail: 'success',
          severity: 'success',
          summary: 'sucess',
        });
      },
      error: (value) => {
        this.Message.add({
          detail: 'error',
          severity: 'error',
          summary: 'error',
        });
      },
      complete:()=>{
      //  interval(3000)
      
      }
    });
  }

  GenerateFormDataFromControls(): FormData {
    const formData = new FormData();

    formData.append('propertyId', this.PropertyId as any);
    formData.append("Locationid",this.value.location.id )
    formData.append('title', this.value.title);
    formData.append('ShortDescription', this.value.ShortDescription);
    formData.append('Description', this.value.Description);
    formData.append('typeId', this.value.type.id);
    formData.append('categoryId', this.value.category.id);
    formData.append('statusId', this.value.status.statusId);
    formData.append('Money', this.value.price);
    const amenityIds = this.value.amenity
      .map((amenity: any) => amenity.id)
      .join(',');

    formData.append(`amenityIds`, amenityIds);
    const simplifiedImages = this.value.images.map((image: any) => {
      const NewObj = {
        images: image.images.replace(/^data:image\/[a-z]+;base64,/, ''),
        title: image.title,
        description: image.description,
      };
      return NewObj;
    });
    simplifiedImages.forEach((img: any, index: any) => {
      const byteCharacters = atob(img.images);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });
      formData.append(`Images[${index}].Image`, blob, `image${index}.png`);
      formData.append(`Images[${index}].Title`, img.title);
      formData.append(`Images[${index}].Description`, img.description);
    });

    return formData;
  }
}
