import { Component } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { FiltersService } from '../../services/filters.service';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  limit!: number;
  offset!: number;

  constructor(private filterSvc: FiltersService, private route: ActivatedRoute, private newsSvc: NewsService){}

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.limit = Number(params['limit'] as string);
    this.offset = Number(params['offset'] as string);
  }

  onChange(ev: Event){
    this.filterSvc.filter = (ev.target as HTMLSelectElement).value;
  }

}
