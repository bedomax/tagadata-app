import React from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { colors, spacing } from '../../theme';
import { useTheme } from '../../theme/ThemeContext';
import { Text } from '../atoms/Text';
import { ArticleCard } from '../molecules/ArticleCard';
import type { Article } from '../../types';

interface ArticleListProps {
  articles: Article[];
  isLoading: boolean;
  isFetching?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  isFetchingNextPage?: boolean;
  onArticlePress: (article: Article) => void;
  emptyMessage?: string;
}

export function ArticleList({
  articles,
  isLoading,
  isFetching = false,
  isRefreshing = false,
  onRefresh,
  onEndReached,
  isFetchingNextPage = false,
  onArticlePress,
  emptyMessage = 'No articles found.',
}: ArticleListProps) {
  const { mode } = useTheme();
  const palette = colors[mode];

  // First load with no data yet
  if (isLoading && articles.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={palette.accent} />
      </View>
    );
  }

  if (!isLoading && articles.length === 0) {
    return (
      <View style={styles.center}>
        <Text variant="body" color={palette.textDim}>
          {emptyMessage}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.flex}>
      <FlatList
        data={articles}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ArticleCard article={item} onPress={onArticlePress} />
        )}
        style={styles.flex}
        contentContainerStyle={styles.list}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={palette.accent}
            />
          ) : undefined
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color={palette.accent} />
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Overlay spinner when switching tabs/filters with existing data */}
      {isFetching && !isRefreshing && !isFetchingNextPage && (
        <View style={styles.overlay}>
          <ActivityIndicator size="small" color={palette.accent} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing['3xl'],
  },
  footer: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: spacing.lg,
    alignSelf: 'center',
  },
});
