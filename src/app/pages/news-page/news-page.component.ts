import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterEvent, Event } from '@angular/router';
import { filter, tap } from 'rxjs';
import { APIResponse, Contentlet } from 'src/app/interfaces/news.interface';
import { FiltersService } from 'src/app/services/filters.service';
import { NewsService } from 'src/app/services/news.service';
import { ChangeDetectorRef } from '@angular/core';


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
  selectedNews$ = this.newsSvc.selectedNew$;
  isRightSideActiveMobile = false;
  
  constructor(private route: ActivatedRoute, private newsSvc: NewsService, private router: Router, private filterSvc: FiltersService){
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      if(e.url.includes('selectedNew') || e.url.includes('new-post')){
        this.isRightSideActiveMobile = true;
      }
   });
  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.limit = Number(params['limit'] as string);
    this.offset = Number(params['offset'] as string);

    this.news$.pipe(
      tap(posts => {
        this.posts = posts;
      }
      )
    ).subscribe();
    
    this.filter$.pipe(tap(yearString => {
      this.posts = null;
      this.getNews(yearString);
    })).subscribe();

    this.selectedNews$.subscribe(selectedNew => {
        this.selectedNew = selectedNew;
    });
    
    this.selectedNew = this.route.firstChild?.snapshot.params['selectedNew'];
    
    this.isRightSideActiveMobile = this.router.url.includes('selectedNew') || this.router.url.includes('new-post');
    
    this.getNews();
  }

  getNews(year?: string){
    this.newsSvc.getAllNews(this.limit, this.offset, year)
    .pipe(tap((res: APIResponse) => {
      this.newsSvc.news = res.contentlets;
      if(!this.selectedNew && !this.router.url.endsWith('new-post') && window.innerWidth > 768) {
        this.router.navigate(['selectedNew', res.contentlets[0].identifier], { relativeTo:this.route });
      }
    }))
    .subscribe();
  }
}