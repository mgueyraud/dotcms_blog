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

  getAllNews(limit: number, offset:number, year?: string): Observable<APIResponse>{

    let yearQuery:string = '';

    //MM/DD/YYYY
    switch(year){
      case '2022':
        yearQuery = '%5B20220101140000 TO 20221231160000%5D'
        break;
      case '2021':
        yearQuery = '%5B20210101140000 TO 20211231160000%5D'
        break;
      case '2020':
        yearQuery = '%5B20200101140000 TO 20201231160000%5D'
        break;
      default:
        yearQuery = '';
        break;
    }

    return this.http.get<APIResponse>(this.baseURLApi + `/query/+contentType:Blog ${yearQuery.length !== 0 ? `+Blog.postingDate:${yearQuery}` : ''} +languageId:1/depth/0/limit/${limit}/offset/${offset}`);
  }

  getSingleNew(identifier:string): Observable<APIResponse>{
    return this.http.get<APIResponse>(this.baseURLApi + `/id/${identifier}`);
  }

}
