import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { tap, single } from 'rxjs';
import { APIResponse } from 'src/app/interfaces/news.interface';
import { NewsService } from '../../services/news.service';
import { Contentlet, BlogContent, FinalContent } from '../../interfaces/news.interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  selectedNew!: string | null;
  post: Contentlet | null = null;
  htmlString!: string;

  constructor(private route: ActivatedRoute, private newsSvc: NewsService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedNew = params.get('selectedNew');

      if(this.selectedNew){
        this.post = null;
        this.newsSvc.getSingleNew(this.selectedNew)
              .pipe(tap((res: APIResponse) => {
                this.post = res.contentlets[0];
                this.htmlString = `<div class="article-content">${this.buildHtml(this.post.blogContent.content)}</div>`;
              }))
              .subscribe();
      }
    });

  }

  buildHtml(content: BlogContent):string  {
    let html = '';

    for (let index = 0; index < content.length; index++) {
      const singleContent = content[index];
      if(singleContent.type === 'bulletList'){
        html += '<ul>';
        html += this.buildHtml(singleContent.content);
        html += '</ul>';
      }

      if(singleContent.type === 'listItem'){
        html += '<li>';
        html += this.buildHtml(singleContent.content);
        html += '</li>';
      }

      if(singleContent.type === 'paragraph'){
        html += '<p>';
        html += this.buildHtml(singleContent.content);
        html += '</p>';
      }

      if(singleContent.type === 'heading'){
        const tag = `h${singleContent.attrs.level+1}`;
        html += `<${tag}>`;
        html += this.buildHtml(singleContent.content);
        html += `</${tag}>`;
      }

      if(singleContent.type === 'text'){
        html += singleContent.text;
      }
    }

    return html;
  }
}
