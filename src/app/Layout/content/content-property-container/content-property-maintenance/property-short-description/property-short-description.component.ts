import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PropertyShortDescriptionEvent } from "@interface/Content";

@Component({
  selector: 'app-property-short-description',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './property-short-description.component.html',
  styleUrl: './property-short-description.component.scss'
})
export class PropertyShortDescriptionComponent  {

  @Output() selectionChange = new EventEmitter<PropertyShortDescriptionEvent>();
  @Input() PropertyId : number | null =  null;
  
  FormData = {
    shortDescription: ''
  }

  constructor(){
    
  }
 
  onSelectionChange() {
    this.selectionChange.emit({
      ShortDescription : this.FormData.shortDescription
    });
    console.log(this.FormData.shortDescription)
  }

}
