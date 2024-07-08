import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from './cosntant';
import { Detail, DetailResponse } from '@interface/Content';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
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

  public GetAllDetails() {
    return this.httpClient.get<DetailResponse>(`${BaseUrl}/detail`, {
      headers: this.headers,
    });
  }

  public AddDetail(detail: Detail) {
    return this.httpClient.post<any>(`${BaseUrl}/detail`, detail, {
      headers: this.headers,
    });
  }
  public UpdateDetail(detail: Detail) {
    return this.httpClient.put<any>(`${BaseUrl}/detail`, detail, {
      headers: this.headers,
    });
  }
  public DeleteDetail(Id: number) {
    return this.httpClient.delete<any>(`${BaseUrl}/detail/${Id}`, {
      headers: this.headers,
    });
  }
}
