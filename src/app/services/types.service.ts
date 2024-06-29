import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from './cosntant';
import { ApiResponse, Type, TypeReponse } from '../interface/Content';

@Injectable({
  providedIn: 'root',
})
export class TypesService {
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

  public GetAllTypes(Page : any = null) {
    return this.httpClient.get<TypeReponse>(`${BaseUrl}/types/${Page === null? '' : `?page=${Page}`}`, {
      headers: this.headers,
    });
  }

  public AddAType(Type: Type) {
    console.log(Type)
    return this.httpClient.post<ApiResponse>(
      `${BaseUrl}/types`,
      Type ,
      { headers: this.headers }
    );
  }
  public ModifyType(Type: Type) {
    return this.httpClient.put<ApiResponse>(
      `${BaseUrl}/types`,
      Type ,
      { headers: this.headers }
    );
  }
  public DeleteType(Id: number) {
    return this.httpClient.delete<ApiResponse>(
      `${BaseUrl}/types/${Id}`,
      { headers: this.headers },

    );
  }
}
