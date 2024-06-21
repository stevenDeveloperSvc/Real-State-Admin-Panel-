import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyDescriptionEvent } from '@interface/Content';

@Component({
  selector: 'app-property-description',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './property-description.component.html',
  styleUrl: './property-description.component.scss'
})
export class PropertyDescriptionComponent {
  @Output() selectionChange = new EventEmitter<PropertyDescriptionEvent>()
  @Input() PropertyId: number | null = null;
  
  FormData: any = {
    Description: ''
  }
  OnSelectionChange() {
    this.selectionChange.emit({
      Description: this.FormData.Description
    })
    console.log(this.FormData.Description)
  }

}
