import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from './cosntant';
import { ApiResponse, Category, CategoryReponse } from '../interface/Content';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

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

  public GetAllCategories() {
    return this.httpClient.get<CategoryReponse>(`${BaseUrl}/category`, {
      headers: this.headers,
    });
  }

  public AddCategory(Category: Category) {
    return this.httpClient.post<ApiResponse>(
      `${BaseUrl}/category`,
      { Category },
      { headers: this.headers }
    );
  }
  public ModifyCategory(Category: Category) {
    return this.httpClient.put<ApiResponse>(
      `${BaseUrl}/category`,
      { Category },
      { headers: this.headers }
    );
  }
  public DeleteCategory(Id: number) {
    return this.httpClient.delete<ApiResponse>(
      `${BaseUrl}/category/${Id}`,
      { headers: this.headers },

    );
  }
}
