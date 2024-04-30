import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  ocupation!: string | null;
  user!: string | null;
  userPicture: any;
  SitePage!: string;

  private routerSubscription: Subscription = new Subscription();

  constructor(private router: Router) {
    this.routerSubscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.SetCurrentPageName(e.url);
      }
    })

  }

  ngOnInit(): void {
    this.ocupation = localStorage.getItem('ocupation');
    this.user = localStorage.getItem('username');
    this.userPicture = `data:image/png;base64, ${localStorage.getItem('image')}`
  }


  private SetCurrentPageName(URL: string): void {
    switch (URL) {
      case "/main/dashboard":
        this.SitePage = "Dashboard"
        break;
      case "/main/user-info":
        const username = localStorage.getItem('username');
        this.SitePage = `Welcome, ${username}`
        break;
      case "/main/property-list":
        this.SitePage = "Property List"
        break;
      case "/main/property-maintenance":
        this.SitePage = "Property Maintenance";
        break;
    }
  }
}
