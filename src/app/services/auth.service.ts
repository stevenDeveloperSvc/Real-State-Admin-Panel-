import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { BaseUrl } from './cosntant';
import { Buffer as b } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private UserInfo!: Observable<any>;
  constructor(private http: HttpClient) { }

  Login(Users: any): Observable<any> {
    this.UserInfo = this.http.post<any>(`${BaseUrl}/auth/login`, Users).pipe(
      shareReplay(1)
    );
    this.SaveToken();
    return this.UserInfo;
  }
  private SaveToken(): void {
    this.UserInfo.subscribe({
      next: (value) => {
        localStorage.setItem('token', value.result);
        localStorage.setItem('username', value.user?.username)
        localStorage.setItem('image', value.user?.image);
        localStorage.setItem('ocupation', value.user?.ocupation)
      },
      error: (e) => {
        console.log(e)
      }
    });
  }

  Logout(): void {
    localStorage.clear();
  }

  private GetToken(): string | null {
    return localStorage.getItem('token');
  }

  IsLoggedIn(): boolean {
    const token = this.GetToken();
    if (!token) {
      return false;
    }
    return !this.IsTokenExpried(token);
  }
  IsTokenExpried = (token: string): boolean => (Date.now() >= JSON.parse(b.from(token.split('.')[1], 'base64').toString()).exp * 1000)
}


