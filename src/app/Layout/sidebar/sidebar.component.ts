import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  IsImageLoaded: any;
  ImageUrl: any;
  FirstVowelUser: any;

  activeIndex: number | null = null;

  setActive(index: number) {
    this.activeIndex = index;
  }
  menuItems = [
    { link: '/main/dashboard', icon: '/assets/icon/home.svg', alt: 'home casa default view button', label: 'Home' },
    { link: '/main/property-list', icon: '/assets/icon/building.svg', alt: 'home casa default view button', label: 'Properties' },
    { link: '/main/user-info', icon: '/assets/icon/configuration.svg', alt: 'configuration user', label: 'Configuration' }
  ];

  
  constructor(private Auth: AuthService, private router: Router, private message: MessageService,
  ) { }
  LogOut() {
    this.message.add({ detail: 'Logout Successfully', severity: 'success', summary: 'success' })
    this.Auth.Logout();
    this.router.navigate(["/login"])
  }

}
