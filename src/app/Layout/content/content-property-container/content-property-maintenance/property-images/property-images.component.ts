import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  input,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { ListboxModule } from 'primeng/listbox';
import { iImage } from '@interface/Content';
import { ImageConverter } from './imageConverter';
import { SelectItem } from 'primeng/api';
import { PropertyService } from '@services/property.service';

@Component({
  selector: 'app-property-images',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
    ImageModule,
    ListboxModule,
  ],
  templateUrl: './property-images.component.html',
  styleUrl: './property-images.component.scss',
})
export class PropertyImagesComponent implements OnInit {
  @Output() selectionChange = new EventEmitter<{ images: SelectItem[] }>();
  @Input() OnEditingMode: boolean = false;

  Title!: string;
  Description!: string;
  IsEditing: boolean = false;

  showOverlay: any;
  selectedImageUrl?: string | undefined;
  display?: string | undefined = 'SELECT AN IMAGE';
  _items: SelectItem[] = [];
  selectedItem: SelectItem | null = null;

  image!: iImage;

  constructor(private Property: PropertyService) {}

  ngOnInit(): void {
    if (!this.OnEditingMode) return;
    this.Property.GetPropertyById().subscribe({
      next: ({ responseDTO }) => {
        this.items = [...responseDTO.images];
        console.log(responseDTO);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  @Input()
  set items(value: SelectItem[]) {
    this._items = value;
    this.OnSelectionChange();
  }

  get items(): SelectItem[] {
    return this._items;
  }
  OnSelectionChange() {
    this.selectionChange.emit({
      images: this.items,
    });
  }

  AddCurrentImage() {
    if (this.IsEditing) {
      this.EditImageInfo();
    } else {
      this.AddImageInfo();
    }
    this.ClearInfo();
  }
  AddImageInfo() {
    if (this.selectedImageUrl) {
      const newItem: SelectItem = {
        label: `${this.Title} - ${
          this.Description.length > 10
            ? this.Description.substring(1, 10)
            : this.Description
        }`,
        value: {
          title: this.Title,
          description: this.Description,
          images: this.selectedImageUrl,
        },
      };
      this.items = [...this.items, newItem];
    } else {
      console.error('No image selected!');
    }
  }
  private EditImageInfo() {
    const Index = this.GetCurrentImageIndex();
    if (Index !== -1) {
      this.items[Index] = {
        label: `${this.Title} - ${this.Description}`,
        value: {
          title: this.Title,
          description: this.Description,
          images: this.selectedImageUrl,
        },
      };
      this.items = [...this.items];
    } else {
      this.ClearInfo();
    }
  }
  GetCurrentImageIndex(): number {
    let Index = -1;
    if (this.selectedItem?.title === null) {
      return Index;
    }
    for (let i = 0; i <= this.items.length; i++) {
      // @ts-ignore
      if (this.items[i].value.title === this.selectedItem?.title) {
        Index = i;
        break;
      }
    }
    return Index;
  }
  ClearInfo() {
    this.selectedImageUrl = undefined;
    this.display = 'SELECT AN IMAGE';
    this.Title = '';
    this.Description = '';
    this.IsEditing = false;
  }
  LoadImage(e: any) {
    this.IsEditing = true;
    if (e.value !== undefined || e.value !== null || e.value.title !== null) {
      this.Title = e.value.title;
      this.Description = e.value.description;
      this.selectedImageUrl = e.value.images;
    }
    // const { url, alt, description } = this.image;
    // this.selectedImageUrl = url;
    // this.Title = alt;
    // this.Description = description;
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedImageUrl = await ImageConverter.addWatermark(
        file,
        'assets/watermark.png'
      );
    }
  }

  DeleteCurrentImage() {
    if (this.selectedItem) {
      const index = this.GetCurrentImageIndex();
      this.items.splice(index, 1);
      this.items = [...this.items];
      this.ClearInfo();
    }
  }
}
