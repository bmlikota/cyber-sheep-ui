import { Component, OnInit, signal } from '@angular/core';
import { NewsService } from '../../core/services/news.service';
import { News } from '../../core/models/news';
import { NewsCard } from '../news-card/news-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NewsCard], // only if NewsCard is standalone
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'], // corrected
})
export class Dashboard implements OnInit {
  news = signal<News[]>([]);
  loading = signal(true);

  constructor(private readonly newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe(items => {
      console.log('Dashboard received news:', items);
      this.news.set(items);
      this.loading.set(false);
    });
  }
}
