import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerComponent } from '../../../../progress-spinner/progress-spinner.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category, Type, Status, Amenity } from '../../../../interface/Content';
import { TypesService } from '../../../../services/types.service';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { CategoryService } from '../../../../services/category.service';
import { StatusService } from '../../../../services/status.service';
import { AmenityService } from '../../../../services/amenity.service';
import { GalleriaModule } from 'primeng/galleria';
import { ListboxModule } from 'primeng/listbox';

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
  ],
  templateUrl: './content-property-maintenance.component.html',
  styleUrl: './content-property-maintenance.component.scss',
})
export class ContentPropertyMaintenanceComponent implements OnInit {
  IsLoading: boolean = false;
  Title!: string;
  Description!: string;
  Types!: Type[];
  Status!: Status[];
  Category!: Category[];
  Amenity!: Amenity[];


  showOverlay: any;
  selectedImageUrl?: string | undefined;
  display?: string | undefined = 'SELECT AN IMAGE';
  images: any[] = [];
  image!: iImage;
  FormData={
    title:'',
    type:{},
    category:{},
    status: {},
    amenity:[]
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

  CheckValues() {
    console.log(this.FormData);
  }
  constructor(
    private Message: MessageService,
    private TypeService: TypesService,
    private CategoryService: CategoryService,
    private StatusService: StatusService,
    private AmenityService: AmenityService
  ) {}

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
