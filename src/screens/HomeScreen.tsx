import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useArticles, flattenArticles } from '../services/articles';
import { ArticleList } from '../components/organisms/ArticleList';
import { Header, type Country } from '../components/organisms/Header';
import { TagsBar, type SortMode } from '../components/organisms/TagsBar';
import { AboutModal } from '../components/organisms/AboutModal';
import { colors } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import type { HomeScreenProps } from '../navigation/types';
import type { Article } from '../types';


export function HomeScreen({ navigation }: HomeScreenProps) {
  const { mode } = useTheme();
  const palette = colors[mode];

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('date');
  const [country, setCountry] = useState<Country>('cl');
  const [aboutVisible, setAboutVisible] = useState(false);

  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useArticles({
    tag: selectedTag ?? undefined,
    sort: sortMode,
    country,
  });

  const articles = flattenArticles(data);
  const tags = data?.pages[0]?.tags ?? [];
  const lastUpdated = data?.pages[0]?.last_updated ?? null;

  const handleArticlePress = useCallback(
    (article: Article) => {
      navigation.navigate('ArticleDetail', { article });
    },
    [navigation]
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleLogoPress = useCallback(() => {
    setSelectedTag(null);
    setSortMode('date');
    refetch();
  }, [refetch]);

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      <Header
        lastUpdated={lastUpdated}
        country={country}
        onLogoPress={handleLogoPress}
        onAboutPress={() => setAboutVisible(true)}
        onCountryChange={(c) => {
          setCountry(c);
          setSelectedTag(null);
        }}
      />

      <TagsBar
        tags={tags}
        selectedTag={selectedTag}
        sortMode={sortMode}
        onTagPress={(tag) => {
          setSelectedTag(tag);
        }}
        onSortPress={(sort) => {
          setSortMode(sort);
        }}
      />

      <ArticleList
        articles={articles}
        isLoading={isLoading || (isFetching && !isFetchingNextPage && !isRefetching && articles.length === 0)}
        isFetching={isFetching}
        isRefreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={handleEndReached}
        isFetchingNextPage={isFetchingNextPage}
        onArticlePress={handleArticlePress}
        emptyMessage="Sin noticias. Desliza hacia abajo para actualizar."
      />

      <AboutModal visible={aboutVisible} onClose={() => setAboutVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
