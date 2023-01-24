import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Contentlet } from '../../interfaces/news.interface';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.scss']
})
export class NewsListItemComponent {
  @Input() post!: Contentlet;
  limit!: number;
  offset!: number;
  selectedNew!: string | null;
  selectedNews$ = this.newsSvc.selectedNew$;
  
  constructor(private route: ActivatedRoute, private newsSvc: NewsService){}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.limit = Number(params['limit'] as string);
    this.offset = Number(params['offset'] as string);
    
    this.selectedNews$.subscribe(selectedNew => {
      this.selectedNew = selectedNew;
    })
  }
}
