import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NewsService } from '../../core/services/news.service';
import { News } from '../../core/models/news';
import { NewsCard } from '../news-card/news-card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, NewsCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  news$ : Observable<News[]>;
  loading = true;

  constructor(private readonly newsService: NewsService) {
    this.news$ = this.newsService.getNews();
  }

  ngOnInit(): void {
    this.news$.subscribe(() => (this.loading = false));
  }
}
