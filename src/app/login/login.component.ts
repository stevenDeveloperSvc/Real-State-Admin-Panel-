import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {  DividerModule } from "primeng/divider"

@Component({
  selector: 'app-login',
  standalone: true,
  imports : [DividerModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
