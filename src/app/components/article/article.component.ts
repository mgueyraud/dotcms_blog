import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { tap } from 'rxjs';
import { APIResponse } from 'src/app/interfaces/news.interface';
import { NewsService } from '../../services/news.service';
import { Contentlet, BlogContent } from '../../interfaces/news.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  selectedNew!: string | null;
  post: Contentlet | null = null;
  timeReading: string = '';
  htmlString!: string;

  constructor(
    private route: ActivatedRoute, 
    private newsSvc: NewsService,
    private location: Location
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedNew = params.get('selectedNew');

      if(this.selectedNew){
        this.post = null;
        this.newsSvc.getSingleNew(this.selectedNew)
              .pipe(tap((res: APIResponse) => {
                this.post = res.contentlets[0];
                const { blogContent } = this.post;
                const isContentString = typeof blogContent === 'string';
                this.timeReading = !isContentString && blogContent.attrs ? blogContent.attrs.readingTime + 'm read' : ''
                this.htmlString = `
                  <div class="article-content">
                    ${isContentString ? blogContent : this.buildHtml(blogContent.content)}
                  </div>`;
              }))
              .subscribe();
      }
    });

  }

  goBackMobile():void{
    this.newsSvc.selectedNew = '';
    this.location.back();
  }

  buildHtml(content: BlogContent):string  {
    let html = '';

    if(!content) return '';

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
      
      if(singleContent.type === 'dotImage'){
        html += `<img src="https://demo.dotcms.com${singleContent.attrs.data.asset}"/>`;
      }

      if(singleContent.type === 'text'){
        if(singleContent.marks?.[0]['type'] === 'bold'){
          html += `<b>${singleContent.text}</b>`;
        }else if(singleContent.marks?.[0]['type'] === 'link'){
          html += `<a href="${singleContent.marks?.[0]['attrs']['href']}" target="_blank">${singleContent.text}</a>`;
        }else{
          html += singleContent.text;
        }

      }
    }

    return html;
  }
}
