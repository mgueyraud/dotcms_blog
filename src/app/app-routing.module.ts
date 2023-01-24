import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'news', 
    loadChildren: () => import('./pages/news-page/news-page.module').then(m => m.NewsPageModule) 
  },
  {
    path: '', redirectTo: 'news', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
