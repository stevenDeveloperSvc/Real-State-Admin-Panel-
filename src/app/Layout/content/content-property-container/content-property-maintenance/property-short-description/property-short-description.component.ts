import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  PropertyShortDescription,
  PropertyShortDescriptionEvent,
} from '@interface/Content';
import { PropertyService } from '@services/property.service';

@Component({
  selector: 'app-property-short-description',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './property-short-description.component.html',
  styleUrl: './property-short-description.component.scss',
})
export class PropertyShortDescriptionComponent implements OnInit {
  @Input() OnEditingMode: boolean = false;

  @Output() selectionChange = new EventEmitter<PropertyShortDescriptionEvent>();

  FormData: PropertyShortDescription = {
    shortDescription: '',
  };

  constructor(private Property: PropertyService) {}
  ngOnInit(): void {
    if (!this.OnEditingMode) {
      this.ClearInfo();
      return;
    }
    this.Property.GetPropertyById().subscribe({
      next: ({ responseDTO }) => {
        this.FormData = {
          shortDescription: responseDTO.shortDescription,
        };
        this.onSelectionChange();
      },
    });
  }
  ClearInfo() {
    this.FormData.shortDescription = '';
  }

  ValidateMaxLength(e: any) {
    const input = e.target as HTMLTextAreaElement;
    if (input.value.length > 300) {
      input.value = input.value.slice(0, 300);
      this.FormData.shortDescription = input.value; // Update the model if needed
    }
  }

  onSelectionChange() {
    this.selectionChange.emit({
      ShortDescription: this.FormData.shortDescription,
    });
  }
}
