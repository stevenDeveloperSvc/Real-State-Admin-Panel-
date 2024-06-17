import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from './cosntant';
import { PropertyResponse } from '../interface/Content';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {


  private headers?: HttpHeaders;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    let Token: string = '';
    this.route.queryParams.subscribe({
      next: ({ token }) => {
        Token = token;
      },
    });

    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + (Token === undefined ? localStorage.getItem('token') : Token)
    })
  }

  public GetAllProperties(page:number | null) {
    return this.httpClient.get<PropertyResponse>(`${BaseUrl}/Property?page=${page??1}`, { headers: this.headers });
  }

}
