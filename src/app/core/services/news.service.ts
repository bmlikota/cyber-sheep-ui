import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { News } from '../models/news';

const MOCK_NEWS: News[] = [
  {
    id: '1',
    title: 'Massive Phishing Campaign Targets European Banks',
    source: 'The Hacker News',
    url: 'https://thehackernews.com/...',
    publishedAt: '2025-11-29T09:30:00Z',
    categories: ['Phishing', 'Banking'],
    summary:
      'A large-scale phishing operation has been discovered targeting customers of multiple European banks, using lookalike domains and MFA fatigue attacks.',
    relevanceScore: 0.92,
    confidenceScore: 0.88,
    isRead: false,
    content:
      'Security researchers have uncovered a coordinated phishing campaign targeting customers of multiple European banks. The attackers use lookalike domains, cloned login pages, and MFA fatigue attacks to trick users into approving fraudulent sessions. The campaign has been active since early November and appears to be operated by a well-funded group with access to initial access brokers and bulletproof hosting…',
  },
  {
    id: '2',
    title: 'New Malware Variant Bypasses EDR via Living-off-the-Land',
    source: 'The Hacker News',
    url: 'https://thehackernews.com/...',
    publishedAt: '2025-11-29T08:10:00Z',
    categories: ['Malware', 'Endpoint'],
    summary:
      'Researchers identified a malware strain that abuses signed Windows binaries to evade common EDR products, focusing on credential theft.',
    relevanceScore: 0.97,
    confidenceScore: 0.93,
    isRead: false,
    content:
      'The newly observed malware variant, dubbed “LoLTrojan”, relies heavily on living-off-the-land techniques. Instead of dropping obvious binaries, it chains together signed Windows utilities such as regsvr32, rundll32, and wmic to download, execute, and persist. Because the behavior closely mimics legitimate admin activity, many EDR tools fail to flag it unless advanced behavior analytics are enabled…',
  },
  {
    id: '3',
    title: 'Critical Zero-Day in Popular VPN Appliance Under Active Exploitation',
    source: 'The Hacker News',
    url: 'https://thehackernews.com/...',
    publishedAt: '2025-11-29T07:45:00Z',
    categories: ['Vulnerability', 'Malware'],
    summary:
      'Vendors have confirmed a zero‑day vulnerability in a widely used VPN appliance that is being actively exploited in the wild to gain initial access to corporate networks.',
    relevanceScore: 0.89,
    confidenceScore: 0.75,
    isRead: false,
    // content intentionally omitted to trigger fallback link in NewsDetail
  },
];

@Injectable({ providedIn: 'root' })
export class NewsService {
  // Later we’ll use this.http for real API calls
  constructor(private readonly http: HttpClient) {}

  // Main method dashboard will use
  getNews(): Observable<News[]> {
    // TODO (future): return this.http.get<News[]>(`/api/news`);
    return of(MOCK_NEWS).pipe(delay(300)); // simulate network latency
  }

  getNewsById(id: string): Observable<News | undefined> {
    // TODO (future): return this.http.get<News>(`/api/news/${id}`);
    const item = MOCK_NEWS.find(n => n.id === id);
    return of(item).pipe(delay(150));
  }
}