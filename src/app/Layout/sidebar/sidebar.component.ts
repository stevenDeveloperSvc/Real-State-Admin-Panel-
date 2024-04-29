import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
IsImageLoaded: any;
ImageUrl: any;
FirstVowelUser: any;
constructor(private Auth : AuthService, private router  : Router){}
LogOut() {
  this.Auth.Logout();
  this.router.navigate(["/login"])
}

}
