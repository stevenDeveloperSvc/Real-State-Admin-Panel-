import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from './cosntant';
import { Observable, lastValueFrom } from 'rxjs';
import { User, UserInfo } from '../interface/Content';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private headers?: HttpHeaders;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    let Token: string = '';
    this.route.queryParams.subscribe({
      next: ({ token }) => {
        Token = token;
      },
    });

    this.headers = new HttpHeaders({
      Authorization:
        'Bearer ' +
        (Token === undefined ? localStorage.getItem('token') : Token),
    });
  }

  private GetUserInfoByRequest(): Observable< User > {
    return this.httpClient.get<any>(`${BaseUrl}/user/info`, {
      headers: this.headers
    });
  }

  public async GetUserInfoByRequestPromise() : Promise<User> {
    return await lastValueFrom(this.GetUserInfoByRequest());
  }

  public SaveUser(User : UserInfo){
    return this.httpClient.post(`${BaseUrl}/user/modify`,User,{headers: this.headers})
  }
}
