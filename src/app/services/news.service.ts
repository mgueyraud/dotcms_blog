import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contentlet, APIResponse } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseURLApi = 'https://demo.dotcms.com/api/content'
  private newsSubject = new BehaviorSubject<Contentlet[]>([]);
  private selectedNewSubject = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) { }

  get news$(): Observable<Contentlet[]>{
    return this.newsSubject.asObservable();
  }

  set news(posts: Contentlet[]){
    this.newsSubject.next(posts);
  }

  get selectedNew$(): Observable<string>{
    return this.selectedNewSubject.asObservable();
  }

  set selectedNew(newPost: string){
    this.selectedNewSubject.next(newPost);
  }
  
  addNew(newPost: Contentlet){
    this.newsSubject.next([...this.newsSubject.getValue(), newPost])
  }

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

  createNewPost(formData: FormData): Observable<APIResponse>{

    // this.http.post<APIResponse>()
    formData.set('contentType', 'Blog');
    formData.set('contentHost', '48190c8c-42c4-46af-8d1a-0cd5db894797');

    return this.http.post<APIResponse>(
      this.baseURLApi + '/publish/1', 
      formData,
      {
        headers:{
          DOTAUTH: 'YWRtaW5AZG90Y21zLmNvbTphZG1pbg==',
          'Content-Disposition': 'form-data; name="image""'
        }
      }
    );
  }
}
