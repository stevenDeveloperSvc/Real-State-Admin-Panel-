import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from './cosntant';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
private  headers?: HttpHeaders;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    let Token: string = '';
    this.route.queryParams.subscribe({
      next: ({ token }) => {
        Token = token;
      },
    });

    this.headers = new HttpHeaders({
      'Authorization' : 'Bearer ' + (Token === undefined? localStorage.getItem('token') : Token)
    })
  }

  
  public GetUserInfoByRequest() {
    return this.httpClient.get<any>(`${BaseUrl}/user/info`, {headers: this.headers});
  }
}
