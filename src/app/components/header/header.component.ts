import { Component } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { FiltersService } from '../../services/filters.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  limit!: number;
  offset!: number;

  constructor(private filterSvc: FiltersService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.limit = Number(params.get('limit'));
      this.offset = Number(params.get('offset'));
    });
  }

  onChange(ev: Event){
    this.filterSvc.filter = (ev.target as HTMLSelectElement).value;
  }

}
