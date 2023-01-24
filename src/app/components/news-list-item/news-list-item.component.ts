import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  
  constructor(
    private route: ActivatedRoute, 
    private newsSvc: NewsService,
    private router: Router,
  ){}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.limit = Number(params['limit'] as string);
    this.offset = Number(params['offset'] as string);
    this.selectedNew = this.route.firstChild?.snapshot.params['selectedNew'];
    
    this.selectedNews$.subscribe(selectedNew => {
      if(selectedNew.length > 0){
        this.selectedNew = selectedNew;
      }
    })
  }

  changeSelectedNew(identifier: string){
    this.newsSvc.selectedNew = identifier;
  }
}
