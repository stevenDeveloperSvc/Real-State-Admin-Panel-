import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { Category, Type, Status, Amenity, PropertyBasicInfoEvent } from '@interface/Content';
import { FormsModule } from '@angular/forms';
import { TypesService } from '@services/types.service';
import { CategoryService } from '@services/category.service';
import { StatusService } from '@services/status.service';
import { AmenityService } from '@services/amenity.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-property-short-description',
  standalone: true,
  imports: [DropdownModule, MultiSelectModule, CommonModule, FormsModule],
  templateUrl: './property-short-description.component.html',
  styleUrl: './property-short-description.component.scss'
})
export class PropertyShortDescriptionComponent implements OnInit {

  @Output() selectionChange = new EventEmitter<PropertyBasicInfoEvent>();

  Types!: Type[];
  Status!: Status[];
  Category!: Category[];
  Amenity!: Amenity[];
  FormData = {
    title : null,
    type: null,
    category: null,
    status: null,
    amenity: []
  };
  constructor(
    private TypeService: TypesService,
    private CategoryService: CategoryService,
    private StatusService: StatusService,
    private AmenityService: AmenityService,
    private Message : MessageService

  ){

  }

  ngOnInit(): void {
    this.GetAllTypes();
    this.GetAllCategories();
    this.GetAllStatus();
    this.GetAllAmenities();
  }
  private GetAllTypes() {
    this.TypeService.GetAllTypes().subscribe({
      next: (value) => {
        this.Types = value.types;
      },
      error: () => {
        this.ShowErrorMesage('Types');
      },
    });
  }
  private GetAllCategories() {
    this.CategoryService.GetAllCategories().subscribe({
      next: (value) => {
        this.Category = value.categories;
      },
      error: () => {
        this.ShowErrorMesage('Categories');
      },
    });
  }
  private GetAllStatus() {
    this.StatusService.GetAllStatus().subscribe({
      next: (value) => {
        this.Status = value.status;
      },
      error: () => {
        this.ShowErrorMesage('Status');
      },
    });
  }
  private GetAllAmenities() {
    this.AmenityService.GetAllAmenities().subscribe({
      next: (value) => {
        this.Amenity = value.amenities;
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

  onSelectionChange() {
    this.selectionChange.emit({
      title: this.FormData.title,
      type: this.FormData.type,
      category: this.FormData.category,
      status: this.FormData.status,
      amenity: this.FormData.amenity
    });
  }
}
