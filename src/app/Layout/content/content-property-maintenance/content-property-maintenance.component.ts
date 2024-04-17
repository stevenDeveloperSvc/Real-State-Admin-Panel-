import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-content-property-maintenance',
  standalone: true,
  imports: [CommonModule,ImageModule],
  templateUrl: './content-property-maintenance.component.html',
  styleUrl: './content-property-maintenance.component.scss'
})
export class ContentPropertyMaintenanceComponent {

  selectedImageUrl?: string  | undefined ; 
  display? : string | undefined ="SELECT AN IMAGE";
  constructor() {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0]; 

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = ( e : any) =>{
        const img = new Image();
        img.src = e.target.result;

        img.onload = () =>{
          const watermark = new Image();
          watermark.src = 'assets/watermark.png'
          watermark.onload = ()=>{
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

   
            ctx?.drawImage(img, 0, 0);

            const xPos = canvas.width - watermark.width -90
            const yPos = canvas.height - watermark.height -90
            ctx?.drawImage(watermark, xPos, yPos);
            this.selectedImageUrl = canvas.toDataURL('image/png');
          }
        }
      }
      fileReader.readAsDataURL(file);

    }
  }

  DeleteCurrentImage() {
      this.selectedImageUrl = undefined;
      this.display ="SELECT AN IMAGE";

    }
}
