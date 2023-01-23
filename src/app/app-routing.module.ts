import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'news/limit/:limit/offset/:offset', 
    loadChildren: () => import('./pages/news-page/news-page.module').then(m => m.NewsPageModule) 
  },
  {
    path: '', redirectTo: 'news/limit/10/offset/0', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
