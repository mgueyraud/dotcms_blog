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
  posts: Contentlet[] | null = null;
  selectedNew!: string | null;
  filter$ = this.filterSvc.filter$;
  news$ = this.newsSvc.news$;
  
  constructor(private route: ActivatedRoute, private newsSvc: NewsService, private router: Router, private filterSvc: FiltersService){}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.limit = Number(params['limit'] as string);
    this.offset = Number(params['offset'] as string);

    this.route.firstChild?.params.subscribe(newParams => {
      this.selectedNew = newParams['selectedNew'] as string | null;
    })

    this.getNews();

    this.news$.pipe(
      tap(posts => 
        this.posts = posts.length > 0 ? posts : null
      )
    ).subscribe();
    
    this.filter$.pipe(tap(yearString => {
      this.posts = null;
      this.getNews(yearString);
    })).subscribe();
  }

  getNews(year?: string){
    this.newsSvc.getAllNews(this.limit, this.offset, year)
    .pipe(tap((res: APIResponse) => {
      this.newsSvc.news = res.contentlets;
      if(!this.selectedNew && !this.router.url.endsWith('new-post')) {
        this.router.navigate(['selectedNew', res.contentlets[0].identifier], { relativeTo:this.route });
      }
    }))
    .subscribe();
  }
}