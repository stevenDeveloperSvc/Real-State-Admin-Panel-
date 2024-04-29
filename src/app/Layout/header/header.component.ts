import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.ocupation = localStorage.getItem('ocupation');
    this.user = localStorage.getItem('username');
    this.userPicture = `data:image/png;base64, ${localStorage.getItem('image')}`
  }

}
