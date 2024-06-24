import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PropertyDescription,
  PropertyDescriptionEvent,
} from '@interface/Content';
import { PropertyService } from '@services/property.service';
import { ProgressSpinnerComponent } from 'app/progress-spinner/progress-spinner.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-property-description',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, ProgressSpinnerComponent],
  templateUrl: './property-description.component.html',
  styleUrl: './property-description.component.scss',
})
export class PropertyDescriptionComponent implements OnInit {
  @Input() OnEditingMode : boolean = false;
  @Output() selectionChange = new EventEmitter<PropertyDescriptionEvent>();
  IsLoading : boolean = false;

  FormData: PropertyDescription = {
    Description: '',
  };

  constructor(private Property: PropertyService, private Message : MessageService) {}
  ngOnInit(): void {
    
  if(!this.OnEditingMode) return;
   this.IsLoading = true;
    this.Property.GetPropertyById().subscribe({
      next:({ responseDTO })=>{
        this.FormData = {
          Description : responseDTO.description  
        }
        this.IsLoading = false;
        this.OnSelectionChange();
      },
      error:()=>{
        this.Message.add({
          detail:'Error while triying to get Property Description',
          severity: 'error',
          summary: 'error'
        })
      }
    })
  }
  OnSelectionChange() {
    this.selectionChange.emit({
      Description: this.FormData.Description,
    });
  }
}
