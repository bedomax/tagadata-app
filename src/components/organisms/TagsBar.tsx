import React from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { useTheme } from '../../theme/ThemeContext';
import { Text } from '../atoms/Text';
import type { Tag } from '../../types';

export type SortMode = 'date' | 'score' | 'videos';

interface TagsBarProps {
  tags: Tag[];
  selectedTag: string | null;
  sortMode: SortMode;
  onTagPress: (tag: string | null) => void;
  onSortPress: (sort: SortMode) => void;
}

export function TagsBar({ tags, selectedTag, sortMode, onTagPress, onSortPress }: TagsBarProps) {
  const { mode } = useTheme();
  const palette = colors[mode];

  return (
    <View style={[styles.container, { backgroundColor: palette.surface, borderBottomColor: palette.border }]}>
      {/* Tags horizontal scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsContent}
        style={styles.tagsScroll}
      >
        <TagPill
          label="todos"
          active={selectedTag === null}
          onPress={() => onTagPress(null)}
          palette={palette}
        />
        {tags.map((t) => (
          <TagPill
            key={t.tag}
            label={`#${t.tag}`}
            count={t.count}
            active={selectedTag === t.tag}
            onPress={() => onTagPress(t.tag)}
            palette={palette}
          />
        ))}
      </ScrollView>

      {/* Sort pills */}
      <View style={styles.sortRow}>
        <SortPill
          label="recientes"
          active={sortMode === 'date'}
          onPress={() => onSortPress('date')}
          palette={palette}
        />
        <SortPill
          label="trending"
          active={sortMode === 'score'}
          onPress={() => onSortPress('score')}
          palette={palette}
        />
        <SortPill
          label="▶ videos"
          active={sortMode === 'videos'}
          onPress={() => onSortPress('videos')}
          palette={palette}
          accentColor="#ff0000"
        />
      </View>
    </View>
  );
}

function TagPill({
  label,
  count,
  active,
  onPress,
  palette,
}: {
  label: string;
  count?: number;
  active: boolean;
  onPress: () => void;
  palette: typeof colors.dark;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.pill,
        active
          ? { backgroundColor: palette.accent, borderColor: palette.accent }
          : { backgroundColor: palette.surface, borderColor: palette.border },
      ]}
    >
      <Text
        variant="xs"
        weight={active ? 'medium' : 'normal'}
        color={active ? '#fff' : palette.textDim}
        style={styles.monoText}
      >
        {label}
      </Text>
      {count !== undefined && !active && (
        <Text variant="xs" color={palette.textMuted} style={styles.monoText}>
          {' '}({count})
        </Text>
      )}
    </TouchableOpacity>
  );
}

function SortPill({
  label,
  active,
  onPress,
  palette,
  accentColor,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  palette: typeof colors.dark;
  accentColor?: string;
}) {
  const textColor = active
    ? (accentColor ?? palette.text)
    : (accentColor ? `${accentColor}99` : palette.textMuted);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.sortPill,
        active && {
          borderBottomWidth: 1,
          borderBottomColor: accentColor ?? palette.borderHi,
        },
      ]}
    >
      <Text
        variant="xs"
        color={textColor}
        weight={active ? 'semibold' : 'normal'}
        style={styles.monoText}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingBottom: spacing.md,
  },
  tagsScroll: {
    flexGrow: 0,
  },
  tagsContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  sortRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },
  sortPill: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  monoText: {
    fontFamily: 'monospace',
  },
});
