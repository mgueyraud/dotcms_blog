import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsPageRoutingModule } from './news-page-routing.module';
import { NewsPageComponent } from './news-page.component';
import { ArticleComponent } from '../../components/article/article.component';
import { NewsListItemComponent } from '../../components/news-list-item/news-list-item.component';
import { TimeSincePipe } from 'src/app/pipes/timeSince.pipe';
import { PublishedFormatPipe } from 'src/app/pipes/pubishedFormat.pipe';
import { LazyImgDirective } from 'src/app/directives/images.directives';
import { NewPostComponent } from './components/new-post/new-post.component';


@NgModule({
  declarations: [
    NewsPageComponent,
    NewsListItemComponent,
    ArticleComponent,
    TimeSincePipe,
    PublishedFormatPipe,
    LazyImgDirective,
    NewPostComponent
  ],
  imports: [
    CommonModule,
    NewsPageRoutingModule,
  ]
})
export class NewsPageModule { }
