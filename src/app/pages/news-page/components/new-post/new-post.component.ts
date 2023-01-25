import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewsService } from '../../../../services/news.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Contentlet } from '../../../../interfaces/news.interface';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit{
  limit!: number;
  offset!: number;
  constructor(
    private newsSvc: NewsService, 
    private location: Location, 
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    //Better UX and for accessibility reasons also
    document.querySelector('input')?.focus();
    this.newsSvc.selectedNew = '';

    const params = this.route.parent?.snapshot.params;

    if(params){
      this.limit = Number(params['limit'] as string);
      this.offset = Number(params['offset'] as string);
    }

  }

  goBackMobile():void{
    this.location.back();
  }

  onSubmit(ev: Event){

    const formData = new FormData(ev.target as HTMLFormElement);
    
    this.newsSvc.createNewPost(formData)
      .subscribe(res => {
        if(res.status === 200){
          const newPostIdentifier = res.headers.get('identifier');
          this.newsSvc.addNew(
            {
              title: formData.get('title'),
              identifier: newPostIdentifier,
              postingDate: formData.get('postingDate')
            } as Contentlet
          );

          this.newsSvc.selectedNew = newPostIdentifier || '';

          this.router.navigate(['/news/limit',this.limit,'offset',this.offset,'selectedNew', newPostIdentifier]);
        }
      });
  }
}
