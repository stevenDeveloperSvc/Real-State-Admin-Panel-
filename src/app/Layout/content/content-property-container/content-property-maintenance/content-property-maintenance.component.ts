import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerComponent } from '../../../../progress-spinner/progress-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PropertyBasicInfoEvent,
  PropertyDescriptionEvent,
  PropertyShortDescriptionEvent,
} from '@interface/Content';
import { MessageService } from 'primeng/api';

import { PropertyShortDescriptionComponent } from './property-short-description/property-short-description.component';
import { PropertyBasicInfoComponent } from './property-basic-info/property-basic-info.component';
import { PropertyDescriptionComponent } from './property-description/property-description.component';
import { PropertyImagesComponent } from './property-images/property-images.component';

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
    PropertyImagesComponent
  ],
  templateUrl: './content-property-maintenance.component.html',
  styleUrl: './content-property-maintenance.component.scss',
})
export class ContentPropertyMaintenanceComponent implements OnInit {
  IsLoading: boolean = false;
 
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
  constructor() {}

  handlePropertyShortDescriptionSelectionChange(
    e: PropertyShortDescriptionEvent
  ) {}
  handlePropertySelectionSelectionChange(e: PropertyBasicInfoEvent) {}
  handlePropertyDescription(e: PropertyDescriptionEvent) {}

  handleSelectionChange(e: PropertyBasicInfoEvent) {
    console.log(e);
  }
  ngOnInit(): void {}

  SubmitPropertyInfo() {
    throw new Error('Method not implemented.');
  }
}
