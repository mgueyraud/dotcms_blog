import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { tap } from 'rxjs';
import { NewsService } from '../../services/news.service';
import { Contentlet, APIResponse } from '../../interfaces/news.interface';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  limit!: number;
  offset!: number;
  posts: Contentlet[] = [];
  selectedNew!: string | null;
  filter$ = this.filterSvc.filter$;
  
  constructor(private route: ActivatedRoute, private newsSvc: NewsService, private router: Router, private filterSvc: FiltersService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.limit = Number(params.get('limit'));
      this.offset = Number(params.get('offset'));
      this.selectedNew = params.get('selectedNew');
    });

    this.getNews();
    
    this.filter$.pipe(tap(yearString => {
      this.posts = [];
      this.getNews(yearString);
    })).subscribe();
  }

  getNews(year?: string){
    this.newsSvc.getAllNews(this.limit, this.offset, year)
    .pipe(tap((res: APIResponse) => {
      this.posts = res.contentlets;
      if(!this.selectedNew) this.router.navigate(['selectedNew', res.contentlets[0].identifier], {relativeTo: this.route})
    }))
    .subscribe();
  }
}
