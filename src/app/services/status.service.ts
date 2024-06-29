import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from './cosntant';
import { ApiResponse, Status, StatusResponse } from '../interface/Content';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
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

  public GetAllStatus(Page: null | number = null) {
    return this.httpClient.get<StatusResponse>(`${BaseUrl}/status${Page === null? '' : `?page=${Page}`}`, {
      headers: this.headers,
    });
  }
  public AddStatus(Status: Status) {
    return this.httpClient.post<ApiResponse>(
      `${BaseUrl}/status`,
      Status ,
      { headers: this.headers }
    );
  }
  public ModifyStatus(Status: Status) {
    return this.httpClient.put<ApiResponse>(
      `${BaseUrl}/status`,
       Status ,
      { headers: this.headers }
    );
  }
  public Deletestatus(Id: number) {
    return this.httpClient.delete<ApiResponse>(
      `${BaseUrl}/status/${Id}`,
      { headers: this.headers },

    );
  }
}
