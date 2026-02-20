import { useInfiniteQuery } from '@tanstack/react-query';
// Note: no detail endpoint exists in the API — articles are opened via Linking.openURL
import { apiClient } from './api';
import type { Article, NewsResponse } from '../types';

const PAGE_SIZE = 20;

export const articleKeys = {
  all: ['articles'] as const,
  list: (country?: string, tag?: string, sort?: string) =>
    [...articleKeys.all, 'list', { country, tag, sort }] as const,
};

interface FetchArticlesParams {
  offset: number;
  country?: string;
  tag?: string;
  sort?: 'score' | 'date' | 'videos';
}

function isYouTube(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

async function fetchArticles({
  offset,
  country,
  tag,
  sort,
}: FetchArticlesParams): Promise<NewsResponse> {
  const isVideos = sort === 'videos';

  const { data } = await apiClient.get<NewsResponse>('/api/news', {
    params: {
      limit: PAGE_SIZE,
      offset,
      ...(country && { country }),
      ...(tag && { tag }),
      sort: isVideos ? 'videos' : sort,
    },
  });

  if (isVideos) {
    const videoArticles = data.articles.filter((a) => isYouTube(a.url));
    return { ...data, articles: videoArticles };
  }

  return data;
}

export interface UseArticlesOptions {
  country?: string;
  tag?: string;
  sort?: 'score' | 'date' | 'videos';
}

// Hook — infinite scroll list
export function useArticles(options: UseArticlesOptions = {}) {
  const { country, tag, sort } = options;

  return useInfiniteQuery({
    queryKey: articleKeys.list(country, tag, sort),
    queryFn: ({ pageParam }) =>
      fetchArticles({ offset: pageParam as number, country, tag, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.flatMap((p) => p.articles).length;
      return fetched < lastPage.count ? fetched : undefined;
    },
  });
}

// Flatten pages into a single article array (helper for screens)
export function flattenArticles(
  data: ReturnType<typeof useArticles>['data']
): Article[] {
  return data?.pages.flatMap((p) => p.articles) ?? [];
}
