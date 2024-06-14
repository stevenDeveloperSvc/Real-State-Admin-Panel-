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

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class PasswordComponent {
  passwordForm = this.fb.group({
    Password: ['', [Validators.required]],
    RepeatPassword: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder, private User: UserInfoService, private message : MessageService) {}

  submitUserInfo() {
   this.User.UpdatePassword(this.passwordForm.value as Password).subscribe({
    next:()=>{
      this.message.add({detail:'Password dont match', severity:'success',summary:'success'});
    },
    error:(e)=>{
      this.message.add({detail:'Password dont match', severity:'warn',summary:'warn'});
    }
   });
  }
}
