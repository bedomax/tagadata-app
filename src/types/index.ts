// Raw article as returned by the tagadata.com API
export interface Article {
  id: number;
  title: string;
  url: string;
  source: string;
  country: string;
  published_at: string;
  fetched_at: string;
  cluster_id: string | null;
  score: number;
}

// Tag with frequency count from the API response
export interface Tag {
  tag: string;
  count: number;
}

// Response from GET /api/news
export interface NewsResponse {
  articles: Article[];
  count: number;
  country: string;
  last_updated: string;
  tags: Tag[];
}
