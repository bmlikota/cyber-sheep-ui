import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { NewsService } from '../../core/services/news.service';
import { News } from '../../core/models/news';
import { NewsCard } from '../news-card/news-card';
import { PreferencesService } from '../../core/services/preferences.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NewsCard, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit {
  private readonly newsService = inject(NewsService);
  private readonly prefs = inject(PreferencesService);

  news = signal<News[]>([]);
  loading = signal(true);

  filtersSummary = computed(() => {
    const selected = this.prefs.selectedCategories();
    const minRel = Math.round(this.prefs.minRelevance() * 100);
    const minConf = Math.round(this.prefs.minConfidence() * 100);

    const cats =
      selected.length === 0 ? 'All categories' : selected.join(', ');

    return {
      categoriesLabel: cats,
      minRelevanceLabel: `${minRel}%`,
      minConfidenceLabel: `${minConf}%`,
    };
  });

  // Apply preferences to raw news
  filteredNews = computed(() => {
    const items = this.news();
    const selected = this.prefs.selectedCategories();
    const minRel = this.prefs.minRelevance();
    const minConf = this.prefs.minConfidence();

    return items.filter(item => {
      const categoryMatch =
        selected.length === 0 ||
        item.categories.some(c => selected.includes(c as any));

      return (
        categoryMatch &&
        item.relevanceScore >= minRel &&
        item.confidenceScore >= minConf
      );
    });
  });

  ngOnInit(): void {
    this.newsService.getNews().subscribe(items => {
      this.news.set(items);
      this.loading.set(false);
    });
  }
}