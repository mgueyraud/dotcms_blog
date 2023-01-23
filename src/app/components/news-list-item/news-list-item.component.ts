import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Contentlet } from '../../interfaces/news.interface';

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
  
  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.limit = Number(params.get('limit'));
      this.offset = Number(params.get('offset'));
      this.selectedNew = params.get('selectedNew')
    });
  }
}
