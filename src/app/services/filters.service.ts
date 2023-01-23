import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private filterSubject = new Subject<string>();

  get filter$(): Observable<string>{
    return this.filterSubject.asObservable();
  }

  set filter(newDate: string){
    this.filterSubject.next(newDate);
  }
}
