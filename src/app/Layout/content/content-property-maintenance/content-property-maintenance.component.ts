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
      this.display = "";
      fileReader.onload = (e: any) => {
        this.selectedImageUrl = e.target.result;
      };

      fileReader.readAsDataURL(file);
    }
  }

  DeleteCurrentImage() {
      this.selectedImageUrl = undefined;
      this.display ="SELECT AN IMAGE";

    }
}
