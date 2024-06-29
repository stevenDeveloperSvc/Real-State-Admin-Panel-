import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from './cosntant';
import { OcupationResponse } from '../interface/Content';

@Injectable({
  providedIn: 'root'
})
export class OcupationService {

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

  public GetAllOcupations() {
    return this.httpClient.get<OcupationResponse>(`${BaseUrl}/ocupation`, { headers: this.headers });
  }

}
