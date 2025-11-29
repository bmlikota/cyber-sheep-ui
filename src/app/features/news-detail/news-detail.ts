import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NewsService } from '../../core/services/news.service';
import { News } from '../../core/models/news';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink, DatePipe, DecimalPipe],
  templateUrl: './news-detail.html',
  styleUrl: './news-detail.scss',
})
export class NewsDetail {
  news$: Observable<News | undefined>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly newsService: NewsService,
  ) {
    this.news$ = this.route.paramMap.pipe(
      map(params => params.get('id') ?? ''),
      switchMap(id => this.newsService.getNewsById(id)),
    );
  }
}
