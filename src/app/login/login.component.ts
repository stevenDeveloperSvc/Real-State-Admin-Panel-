import { Component } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DividerModule, RouterLink,FormsModule, ReactiveFormsModule,ToastModule],
  providers:[],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginform = this.form.group({
    username: ['', [Validators.required]],
    password: ['',[Validators.required]],
  });

  constructor(private form: FormBuilder,
    private authService: AuthService,
    private message: MessageService,
    private router: Router) {}

    get Username(){
    return this.loginform.controls['username'];
  }
  URL(){
  }
  
  get Password(){
    return this.loginform.controls['password'];
  }
  
  
  Submit(){
    const userdata = this.loginform.value;
    
    this.authService.Login(userdata).subscribe({
      next:(response)=>{
        
        localStorage.setItem('token', response.result);
        localStorage.setItem('username', response.user?.username);
        localStorage.setItem('id', response.user?.userId);
        this.message.add({detail:'Login Successfully', severity:'success', summary:'success'})
        this.router.navigate(['/main/dashboard'])
        //ruta cuando haga login exitosamente
      },
      error:(error)=>{
        this.message.add({detail:'Password incorrect', severity:'warn',summary:'warn'});
      }
    })
  }
}
