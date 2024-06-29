import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DividerModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    CommonModule,
    ProgressSpinnerModule,
    ProgressSpinnerComponent

  ],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  IsLoading: boolean = false;
  loginform = this.form.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private form: FormBuilder,
    private authService: AuthService,
    private message: MessageService,
    private router: Router
  ) {}

  get Username() {
    return this.loginform.controls['username'];
  }
  get Password() {
    return this.loginform.controls['password'];
  }

  Submit() {
    if (this.loginform.invalid) return;
    this.IsLoading = true;
    const userdata = this.loginform.value;
    this.authService.Login(userdata).subscribe({
      next: () => {
        this.message.add({
          detail: 'Login Successfully',
          severity: 'success',
          summary: 'success',
        });

        this.router.navigate(['/main/dashboard']);
        this.IsLoading = false;
      },
      error: (error) => {
        this.message.add({
          detail: 'Password incorrect',
          severity: 'warn',
          summary: 'warn',
        });
        this.IsLoading  =false;
      },

    });
  }
}
