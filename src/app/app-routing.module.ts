import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './pages/news/news.component';

const routes: Routes = [
  {
    path: 'news/limit/:limit/offset/:offset/selectedNew/:selectedNew',
    component: NewsComponent
  },
  {
    path: 'news/limit/:limit/offset/:offset',
    component: NewsComponent
  },
  {
    path: '', redirectTo: 'news/limit/10/offset/0', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
