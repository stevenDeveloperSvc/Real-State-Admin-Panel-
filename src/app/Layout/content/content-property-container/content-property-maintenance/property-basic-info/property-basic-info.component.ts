import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import {
  Category,
  Type,
  Status,
  Amenity,
  PropertyBasicInfoEvent,
  PropertyResponseInfo,
  PropertyBasic,
  Location,
} from '@interface/Content';

import {
  TypesService,
  CategoryService,
  StatusService,
  AmenityService,
  LocationService,
} from '@services';

import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '@services/property.service';
import { ProgressSpinnerComponent } from 'app/progress-spinner/progress-spinner.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-property-basic-info',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ProgressSpinnerComponent,
    MultiSelectModule,
    InputNumberModule
  ],
  templateUrl: './property-basic-info.component.html',
  styleUrl: './property-basic-info.component.scss',
})
export class PropertyBasicInfoComponent implements OnInit {
  @Output() selectionChange = new EventEmitter<PropertyBasicInfoEvent>();
  @Input() OnEditingMode: boolean = false;

  IsLoading: boolean = false;
  Types!: Type[];
  Status!: Status[];
  Category!: Category[];
  Amenity!: Amenity[];
  Locations!: Location[];

  FormData: PropertyBasic = {
    title: null,
    type: null,
    location: null,
    category: null,
    status: null,
    Price: null,
    amenity: [],
  };
  constructor(
    private TypeService: TypesService,
    private CategoryService: CategoryService,
    private StatusService: StatusService,
    private AmenityService: AmenityService,
    private Message: MessageService,
    private Property: PropertyService,
    private Location: LocationService
  ) {}

  LoadCacheData() {
    this.IsLoading = true;
    this.Property.GetPropertyById().subscribe({
      next: (a) => {
        const { title, category, ameneties, type, status, price, location } =
          a.responseDTO;
        this.FormData = {
          category: category,
          title: title,
          status: status,
          amenity: ameneties,
          location: location,
          type: type,
          Price: price,
        };
        this.IsLoading = false;
        this.emitSelectionChange();
      },
      error: (b) => {},
    });
  }   
  ngOnInit(): void {
    this.GetAllTypes();
    this.GetAllCategories();
    this.GetAllStatus();
    this.GetAllAmenities();
    this.GetAllLocations();
    if (!this.OnEditingMode) return;
    this.LoadCacheData();
  }
  GetAllLocations() {
    this.Location.GetAllLocations().subscribe({
      next: (value) => {
        this.Locations = value.locations;
      },
      error: () => {
        this.ShowErrorMesage("Locations")
      },
    });
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
        console.log(value)
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

  onInputChange() {
    this.emitSelectionChange();
  }

  private emitSelectionChange() {
    this.selectionChange.emit({
      title: this.FormData.title,
      type: this.FormData.type,
      category: this.FormData.category,
      status: this.FormData.status,
      amenity: this.FormData.amenity,
      price: this.FormData.Price,
      location: this.FormData.location,
    });
  }
}
