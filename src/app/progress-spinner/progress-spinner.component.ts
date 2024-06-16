import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-progress-spinner',
  standalone: true,
  imports: [CommonModule,ProgressSpinnerModule],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss'
})
export class ProgressSpinnerComponent {
  @Input() IsLoading: boolean = false;

}
