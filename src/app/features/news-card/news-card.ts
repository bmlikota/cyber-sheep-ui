import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { News } from '../../core/models/news';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './news-card.html',
  styleUrl: './news-card.scss',
})
export class NewsCard {
  @Input({ required: true }) news!: News;

  get relevanceLabel(): string {
    return `${Math.round(this.news.relevanceScore * 100)}%`;
  }

  get confidenceLabel(): string {
    return `${Math.round(this.news.confidenceScore * 100)}%`;
  }
}
