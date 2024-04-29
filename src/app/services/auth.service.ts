import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from './cosntant';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  Login(Users : any) : Observable<any>{
    return this.http.post<any>(`${BaseUrl}/auth/login`, Users);
  }
}


