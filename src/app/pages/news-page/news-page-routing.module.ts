import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsPageComponent } from './news-page.component';
import { ArticleComponent } from '../../components/article/article.component';
import { NewPostComponent } from './components/new-post/new-post.component';


const routes: Routes = [
  { 
    path: 'limit/:limit/offset/:offset', 
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
  {
    path: '',
    redirectTo: 'limit/10/offset/0',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsPageRoutingModule { }
