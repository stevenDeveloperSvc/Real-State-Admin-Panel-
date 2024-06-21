import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { ListboxModule } from 'primeng/listbox';
import { iImage } from '@interface/Content';
import { SelectItem } from 'primeng/api';
import { title } from 'process';

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
  Title!: string;
  Description!: string;
  IsEditing: boolean = false;

  showOverlay: any;
  selectedImageUrl?: string | undefined;
  display?: string | undefined = 'SELECT AN IMAGE';
  items: SelectItem[] = [];
  selectedItem: SelectItem | null = null;

  image!: iImage;

  text1: string = '';
  text2: string = '';

  constructor() {}

  ngOnInit(): void {}

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
          img: this.selectedImageUrl,
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
          img: this.selectedImageUrl,
        },
      };
      this.items = [...this.items];
    }
  }
  GetCurrentImageIndex(): number {
    let Index = -1;
    for (let i = 0; i <= this.items.length; i++) {
      // @ts-ignore
      if (this.items[i].value.title === this.selectedItem?.title) {
        Index = i;
        break;
      }
    }
    return Index
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
    if (e.value !== undefined || e.value !== null) {
      this.Title = e.value.title;
      this.Description = e.value.description;
      this.selectedImageUrl = e.value.img;
    }

    // const { url, alt, description } = this.image;
    // this.selectedImageUrl = url;
    // this.Title = alt;
    // this.Description = description;
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
    if (this.selectedItem) {
      const index = this.GetCurrentImageIndex();
      this.items.splice(index, 1);
      this.items = [...this.items]
      this.ClearInfo();
    }
  }
}
