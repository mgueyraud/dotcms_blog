import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { tap } from 'rxjs';
import { APIResponse, Contentlet } from 'src/app/interfaces/news.interface';
import { FiltersService } from 'src/app/services/filters.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {
  limit!: number;
  offset!: number;
  posts: Contentlet[] = [];
  selectedNew!: string | null;
  filter$ = this.filterSvc.filter$;
  
  constructor(private route: ActivatedRoute, private newsSvc: NewsService, private router: Router, private filterSvc: FiltersService){}

  ngOnInit(): void {
   ( this.route.firstChild || this.route).paramMap.subscribe((params: ParamMap) => {
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
      console.log(this.selectedNew);
      if(!this.selectedNew && !this.router.url.endsWith('new-post')) {
        this.router.navigate(['selectedNew', res.contentlets[0].identifier], {relativeTo: this.route});
      }
    }))
    .subscribe();
  }
}