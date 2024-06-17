import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { ProgressSpinnerComponent } from '../../../../progress-spinner/progress-spinner.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

interface iImage {
  alt: string;
  url: string;
  userid: number;
}

@Component({
  selector: 'app-content-property-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    ImageModule,
    CarouselModule,
    DividerModule,
    ProgressSpinnerComponent,
    FormsModule,
     ReactiveFormsModule
  ],
  templateUrl: './content-property-maintenance.component.html',
  styleUrl: './content-property-maintenance.component.scss',
})
export class ContentPropertyMaintenanceComponent {
  IsLoading: boolean = false;
  PropertyForm = this.formBuilder.group({
    Password: ['', [Validators.required]],
    RepeatPassword: ['', [Validators.required]],
    LastPassword: ['', [Validators.required]],
  });
  Types: any; 

  constructor(private formBuilder : FormBuilder){

  }

  SubmitPropertyInfo() {
    throw new Error('Method not implemented.');
  }

  // selectedImageUrl?: string | undefined;
  // display?: string | undefined = "SELECT AN IMAGE";
  // images: iImage[] | undefined = [];
  // responsiveOptions: any[] = [
  //   {
  //     breakpoint: '1024px',
  //     numVisible: 5
  //   },
  //   {
  //     breakpoint: '768px',
  //     numVisible: 3
  //   },
  //   {
  //     breakpoint: '560px',
  //     numVisible: 1
  //   }
  // ];

  // AddCurrentImage() {
  //   if (this.selectedImageUrl) {
  //     const newImage: iImage = {
  //       alt: "property image",
  //       url: this.selectedImageUrl,
  //       userid: 10
  //     };
  //     this.images?.push(newImage);
  //     console.log(this.images);

  //     this.cdr.detectChanges();

  //     this.selectedImageUrl = undefined;
  //     this.display = "SELECT AN IMAGE";
  //   } else {
  //     console.error('No image selected!');
  //   }
  // }
  // constructor(private cdr: ChangeDetectorRef) { }

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];

  //   if (file) {
  //     const fileReader = new FileReader();

  //     fileReader.onload = (e: any) => {
  //       const img = new Image();
  //       img.src = e.target.result;

  //       img.onload = () => {
  //         const watermark = new Image();
  //         watermark.src = 'assets/watermark.png'
  //         watermark.onload = () => {
  //           const canvas = document.createElement('canvas');
  //           const ctx = canvas.getContext('2d');
  //           canvas.width = img.width;
  //           canvas.height = img.height;

  //           ctx?.drawImage(img, 0, 0);

  //           const xPos = canvas.width - watermark.width - 90
  //           const yPos = canvas.height - watermark.height - 90
  //           ctx?.drawImage(watermark, xPos, yPos);
  //           this.selectedImageUrl = canvas.toDataURL('image/png');
  //         }
  //       }
  //     }
  //     fileReader.readAsDataURL(file);
  //   }
  // }

  // DeleteCurrentImage() {
  //   this.selectedImageUrl = undefined;
  //   this.display = "SELECT AN IMAGE";

  // }
}
