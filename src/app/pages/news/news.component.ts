import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { tap } from 'rxjs';
import { NewsService } from '../../services/news.service';
import { Contentlet, APIResponse } from '../../interfaces/news.interface';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  limit!: number;
  offset!: number;
  posts!: Contentlet[];
  selectedNew!: string | null;
  
  constructor(private route: ActivatedRoute, private newsSvc: NewsService, private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.limit = Number(params.get('limit'));
      this.offset = Number(params.get('offset'));
      this.selectedNew = params.get('selectedNew');
    });

    this.newsSvc.getAllNews(this.limit, this.offset)
          .pipe(tap((res: APIResponse) => {
            this.posts = res.contentlets;
            if(!this.selectedNew) this.router.navigate(['selectedNew', res.contentlets[0].identifier], {relativeTo: this.route})
          }))
          .subscribe();
  }
}
