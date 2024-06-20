import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerComponent } from '../../../../progress-spinner/progress-spinner.component';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PropertyBasicInfoEvent, PropertyDescriptionEvent, PropertyShortDescriptionEvent } from '@interface/Content';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

import { GalleriaModule } from 'primeng/galleria';
import { ListboxModule } from 'primeng/listbox';
import { PropertyShortDescriptionComponent } from './property-short-description/property-short-description.component';
import { PropertyBasicInfoComponent } from './property-basic-info/property-basic-info.component';
import { PropertyDescriptionComponent } from './property-description/property-description.component';

interface iImage {
  id?: number;
  alt: string;
  url: string;
  description: string;
}

@Component({
  selector: 'app-content-property-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    ImageModule,
    DropdownModule,
    CarouselModule,
    DividerModule,
    ProgressSpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    GalleriaModule,
    ListboxModule,
    PropertyBasicInfoComponent,
    PropertyShortDescriptionComponent,
    PropertyDescriptionComponent
  ],
  templateUrl: './content-property-maintenance.component.html',
  styleUrl: './content-property-maintenance.component.scss',
})
export class ContentPropertyMaintenanceComponent implements OnInit {


  IsLoading: boolean = false;
  Title!: string;
  Description!: string;

  showOverlay: any;
  selectedImageUrl?: string | undefined;
  display?: string | undefined = 'SELECT AN IMAGE';
  images: any[] = [];
  image!: iImage;
  value!: any;
  FormData = {
    title: '',
    shortdescription: '',
    money: 0.00,
    type: {},
    category: {},
    status: {},
    amenity: []
  }
  Form = {
    title: '',
    shortdescription: '',
    typeid: 0,
    statusid: 0,
    Description: '',
    money: '',
    categoryid: 0,
    amenityIds: [],
    Images: [],
  };
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

  ) { }

  CheckValues() {
    console.log(this.FormData);
  }
  handlePropertyShortDescriptionSelectionChange(e: PropertyShortDescriptionEvent) {
    this.value = { ... this.value, ...e }

  }
  handlePropertySelectionSelectionChange(e: PropertyBasicInfoEvent) {
    this.value = { ... this.value, ...e }

  }
  handlePropertyDescription(e: PropertyDescriptionEvent) {
    this.value = { ... this.value, ...e }
    console.log(this.value)
  
}



handleSelectionChange(e: PropertyBasicInfoEvent) {
  console.log(e)
}
ngOnInit(): void {
}

SubmitPropertyInfo() {
  throw new Error('Method not implemented.');
}

AddCurrentImage() {
  if (this.selectedImageUrl) {
    const newImage: iImage = {
      alt: this.Title,
      description: this.Description,
      url: this.selectedImageUrl,
    };
    this.images?.push(newImage);

    this.selectedImageUrl = undefined;
    this.display = 'SELECT AN IMAGE';
    this.Title = '';
    this.Description = '';
  } else {
    console.error('No image selected!');
  }
}
LoadImage() {
  console.log(this.image);
  const { url, alt, description } = this.image;
  this.selectedImageUrl = url;
  this.Title = alt;
  this.Description = description;
}

onFileSelected(event: any) {
  const file: File = event.target.files[0];

  if (file) {
    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const watermark = new Image();
        watermark.src = 'assets/watermark.png';
        watermark.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;

          ctx?.drawImage(img, 0, 0);

          const xPos = canvas.width - watermark.width - 90;
          const yPos = canvas.height - watermark.height - 90;
          ctx?.drawImage(watermark, xPos, yPos);
          this.selectedImageUrl = canvas.toDataURL('image/png');
        };
      };
    };
    fileReader.readAsDataURL(file);
  }
}

DeleteCurrentImage() {
  this.selectedImageUrl = undefined;
  this.display = 'SELECT AN IMAGE';
}
}
