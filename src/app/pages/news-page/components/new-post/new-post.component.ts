import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { tap } from 'rxjs';
import { NewsService } from '../../../../services/news.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit{
  constructor(private newsSvc: NewsService){}

  ngOnInit(): void {
      //Better UX and for accessibility reasons also
      document.querySelector('input')?.focus();
  }

  onSubmit(form:NgForm, ev: Event){

    const formData = new FormData(ev.target as HTMLFormElement);
    
    this.newsSvc.createNewPost(formData).
      pipe(tap(res => console.log(res)))
      .subscribe();
  }
}
