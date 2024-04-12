import { Component } from '@angular/core';
import {  DividerModule } from "primeng/divider"

@Component({
  selector: 'app-login',
  standalone: true,
  imports : [DividerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
