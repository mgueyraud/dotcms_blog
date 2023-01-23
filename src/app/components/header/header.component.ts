import { Component } from '@angular/core';
import { FiltersService } from '../../services/filters.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private filterSvc: FiltersService){}

  onChange(ev: Event){
    this.filterSvc.filter = (ev.target as HTMLSelectElement).value;
  }

}
