import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsPageComponent } from './news-page.component';
import { ArticleComponent } from '../../components/article/article.component';
import { NewPostComponent } from './components/new-post/new-post.component';

const routes: Routes = [
  { 
    path: '', 
    component: NewsPageComponent,
    children: [
      { 
        path: 'new-post', 
        component: NewPostComponent 
      },
      { 
        path: 'selectedNew/:selectedNew', 
        component: ArticleComponent 
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsPageRoutingModule { }
