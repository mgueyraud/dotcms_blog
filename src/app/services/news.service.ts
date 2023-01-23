import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contentlet, APIResponse } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseURLApi = 'https://demo.dotcms.com/api/content'
  constructor(private http: HttpClient) { }

  getAllNews(limit: number, offset:number): Observable<APIResponse>{
    return this.http.get<APIResponse>(this.baseURLApi + `/query/+contentType:Blog%20+languageId:1/depth/0/limit/${limit}/offset/${offset}`);
  }

  getSingleNew(identifier:string): Observable<APIResponse>{
    return this.http.get<APIResponse>(this.baseURLApi + `/id/${identifier}`);
  }

}
