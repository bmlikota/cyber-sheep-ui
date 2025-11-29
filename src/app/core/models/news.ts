export interface News {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;       // ISO string
  categories: string[];      // ['Malware', 'AI Agents']
  summary: string;
  relevanceScore: number;    // 0–1 or 0–100
  confidenceScore: number;   // 0–1 or 0–100
  isRead?: boolean;
}
