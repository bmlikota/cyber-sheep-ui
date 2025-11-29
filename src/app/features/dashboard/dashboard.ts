import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { NewsService } from '../../core/services/news.service';
import { News } from '../../core/models/news';
import { NewsCard } from '../news-card/news-card';
import { PreferencesService } from '../../core/services/preferences.service';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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

  // NEW: search term
  searchTerm = signal('');

  private readonly searchInput$ = new Subject<string>();

  resultsStats = computed(() => {
    const total = this.news().length;
    const visible = this.filteredNews().length;

    return { total, visible };
  });

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
    const term = this.searchTerm().trim().toLowerCase();

    return items.filter(item => {
      const categoryMatch =
        selected.length === 0 ||
        item.categories.some(c => selected.includes(c as any));

      const passesThresholds =
        item.relevanceScore >= minRel &&
        item.confidenceScore >= minConf;

      const passesSearch =
        term.length === 0 ||
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        item.categories.some(c => c.toLowerCase().includes(term));

      return categoryMatch && passesThresholds && passesSearch;
    });
  });

  constructor() {
    this.searchInput$
      .pipe(
        debounceTime(400),        // wait 400ms after last keypress
        distinctUntilChanged(),   // ignore same value
      )
      .subscribe(value => {
        this.handleSearch(value);
      });
  }

  ngOnInit(): void {
    this.newsService.getNews().subscribe(items => {
      this.news.set(items);
      this.loading.set(false);
    });
  }

    onSearchChange(value: string): void {
    this.searchTerm.set(value);
    this.searchInput$.next(value);
  }

  private handleSearch(value: string): void {
    const prompt = value.trim();

    if (!prompt) {
      // reload default list
      this.loading.set(true);
      this.newsService.getNews().subscribe(items => {
        this.news.set(items);
        this.loading.set(false);
      });
      return;
    }

    this.loading.set(true);
    this.newsService.searchNews(prompt).subscribe(items => {
      this.news.set(items);
      this.loading.set(false);
    });
  }

}
