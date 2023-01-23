import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NewsListItemComponent } from './components/news-list-item/news-list-item.component';
import { NewsComponent } from './pages/news/news.component';
import { ArticleComponent } from './components/article/article.component';
import { HttpClientModule } from '@angular/common/http';
import { TimeSincePipe } from './pipes/timeSince.pipe';
import { LazyImgDirective } from './directives/images.directives';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewsListItemComponent,
    NewsComponent,
    ArticleComponent,
    TimeSincePipe,
    LazyImgDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
