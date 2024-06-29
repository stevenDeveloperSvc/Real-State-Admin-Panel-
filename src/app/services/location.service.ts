import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse, LocationResponse } from '@interface/Content';
import { BaseUrl } from './cosntant';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


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

  public GetAllLocations(page : null | number = null) {
    return this.httpClient.get<LocationResponse>(`${BaseUrl}/location/${page === null? '' : `?page=${page}`}`, {
      headers: this.headers,
    });
  }

  public AddLocation(Location: Location) {
    return this.httpClient.post<ApiResponse>(
      `${BaseUrl}/location`,
       Location ,
      { headers: this.headers }
    );
  }
  public ModifyLocation(Location: Location) {
    return this.httpClient.put<ApiResponse>(
      `${BaseUrl}/location`,
       Location ,
      { headers: this.headers }
    );
  }
  public DeleteLocation(Id: number) {
    return this.httpClient.delete<ApiResponse>(
      `${BaseUrl}/location/${Id}`,
      { headers: this.headers },

    );
  }}
