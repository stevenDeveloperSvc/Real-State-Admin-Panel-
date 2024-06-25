import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserInfoService } from '../../../../services/user-info.service';
import { Password } from '../../../../interface/Content';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerComponent } from '../../../../progress-spinner/progress-spinner.component';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ProgressSpinnerComponent],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class PasswordComponent {
  IsLoading: boolean = false;
  passwordForm = this.fb.group({
    Password: ['', [Validators.required]],
    RepeatPassword: ['', [Validators.required]],
    LastPassword: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private User: UserInfoService,
    private message: MessageService
  ) {}

  submitUserInfo() {
    this.IsLoading = true;

    this.User.UpdatePassword(this.passwordForm.value as Password).subscribe({
      next: (a) => {
        const response = a as { value: string };
        this.message.add({
          detail: response.value,
          severity: 'success',
          summary: 'success',
        });
        this.passwordForm.reset();
        this.IsLoading = false;
      },
      error: (e) => {
        this.message.add({
          detail: e.error.value ?? e.errors,
          severity: 'warn',
          summary: 'warn',
        });
      this.IsLoading = false;
    },
    });
  }
}
