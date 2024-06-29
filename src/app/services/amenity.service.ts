import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Amenity, AmenityResponse, ApiResponse } from '../interface/Content';
import { BaseUrl } from './cosntant';

@Injectable({
  providedIn: 'root',
})
export class AmenityService {
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

  
  public GetAllAmenities(page: null | number = null) {
    return this.httpClient.get<AmenityResponse>(`${BaseUrl}/amenity${page === null? '' : `?page=${page}`}`, {
      headers: this.headers,
    });
  }

  public AddAmenity(Amenity : Amenity) {
    return this.httpClient.post<ApiResponse>(
      `${BaseUrl}/amenity`,
       Amenity ,
      { headers: this.headers }
    );
  }
  public ModifyAmenity(Amenity: Amenity) {
    return this.httpClient.put<ApiResponse>(
      `${BaseUrl}/amenity`,
       Amenity ,
      { headers: this.headers }
    );
  }
  public DelteAmenity(Id: number) {
    return this.httpClient.delete<ApiResponse>(
      `${BaseUrl}/amenity/${Id}`,
      { headers: this.headers },

    );
  }
}
