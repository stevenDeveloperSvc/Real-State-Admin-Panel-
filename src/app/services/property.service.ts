import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from './cosntant';
import { PropertyResponse, PropertyResponseInfo } from '../interface/Content';
import { Observable, Subject, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private dataCache$?: Observable<PropertyResponseInfo> | null;
  private dataRefreshSource = new Subject<void>();
  dataRefreshed$ = this.dataRefreshSource.asObservable();

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

  public GetAllProperties(page: number | null) {
    return this.httpClient.get<PropertyResponse>(
      `${BaseUrl}/Property?page=${page ?? 1}`,
      { headers: this.headers }
    );
  }

  public GetPropertyById(id?: number | null, forceRefresh: boolean = false) {
    if (forceRefresh || !this.dataCache$) {
      this.dataCache$ = this.httpClient
        .get<PropertyResponseInfo>(`${BaseUrl}/Property/detail/${id}`, {
          headers: this.headers,
        })
        .pipe(shareReplay(1));
      if (forceRefresh) {
        this.dataRefreshSource.next();

      }
    }
    return this.dataCache$;
  }
  forceRefreshData() {
    this.dataCache$ = null;
    this.dataRefreshSource.next();

}
  public AddProperty(value: any) {
    return this.httpClient.post(`${BaseUrl}/Property`, value, {
      headers: this.headers,
    });
  }
}
