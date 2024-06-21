import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

interface MenuItem {
  link: string;
  icon: string;
  alt: string;
  label: string;
  subItems : {link: string; label: string;}[]
}

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

  setActive(index: number | null) {
    this.activeIndex = index;
  }
  menuItems : MenuItem[] = [
    {
      link: '/main/dashboard',
      icon: '/assets/icon/home.svg',
      alt: 'home casa default view button',
      label: 'Home',
      subItems: []
    },
    {
      link: '/main/property',
      icon: '/assets/icon/building.svg',
      alt: 'home casa default view button',
      label: 'Properties',
      subItems: [
        { link: '/main/property/maintenance/0', label: 'New Property' },
        { link: '/main/property/view', label: 'View All Properties' }
      ]
    },
    {
      link: '/main/user-info',
      icon: '/assets/icon/configuration.svg',
      alt: 'configuration user',
      label: 'Configuration',
      subItems: [
        {link:'/main/user-info/info',label:'User Info'},
        {link:'/main/user-info/password',label:'Password'}
      ]
    }
  ];
  

  
  constructor(private Auth: AuthService, private router: Router, private message: MessageService,
  ) { }
  LogOut() {
    this.message.add({ detail: 'Logout Successfully', severity: 'success', summary: 'success' })
    this.Auth.Logout();
    this.router.navigate(["/login"])
  }

}
