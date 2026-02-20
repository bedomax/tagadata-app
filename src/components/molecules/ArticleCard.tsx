import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { useTheme } from '../../theme/ThemeContext';
import { getSourceColor } from '../../theme/sourceColors';
import { Text } from '../atoms/Text';
import type { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
  onPress: (article: Article) => void;
}

type Tier = 'hot' | 'feature' | 'compact';

function getTier(score: number): Tier {
  if (score >= 60) return 'hot';
  if (score > 0) return 'feature';
  return 'compact';
}

function isYouTube(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

export function ArticleCard({ article, onPress }: ArticleCardProps) {
  const { mode } = useTheme();
  const palette = colors[mode];
  const tier = getTier(article.score);
  const sourceColor = getSourceColor(article.source);
  const timeAgo = formatTimeAgo(article.published_at);
  const isVideo = isYouTube(article.url);

  // Badge glow animation for hot/feature
  const glowAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (tier === 'compact') return;
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1000, useNativeDriver: false }),
        Animated.timing(glowAnim, { toValue: 0, duration: 1000, useNativeDriver: false }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [tier]);

  const cardBg =
    tier === 'hot'
      ? mode === 'dark' ? '#100a03' : '#fff8f0'
      : tier === 'feature'
      ? mode === 'dark' ? '#0d0903' : '#fafafa'
      : palette.surface;

  const cardBorder =
    tier === 'hot'
      ? mode === 'dark' ? '#4a2a10' : '#f9c08a'
      : tier === 'feature'
      ? mode === 'dark' ? '#3d2510' : '#f0d5bb'
      : palette.border;

  return (
    <TouchableOpacity onPress={() => onPress(article)} activeOpacity={0.8}>
      <View
        style={[
          styles.card,
          styles[`card_${tier}`],
          { backgroundColor: cardBg, borderColor: cardBorder },
        ]}
      >
        {/* Top accent line for hot/feature */}
        {tier !== 'compact' && (
          <View
            style={[
              styles.accentLine,
              tier === 'hot' ? styles.accentLine_hot : styles.accentLine_feature,
            ]}
          />
        )}

        <View style={[styles.body, styles[`body_${tier}`]]}>
          {/* Source row */}
          <View style={styles.metaRow}>
            <View style={styles.sourceTag}>
              <View style={[styles.sourceDot, { backgroundColor: sourceColor }]} />
              <Text variant="xs" color={palette.textDim} style={styles.monoText}>
                {article.source}
              </Text>
            </View>

            <View style={styles.metaRight}>
              {tier === 'hot' && <HotBadge />}
              {tier === 'feature' && <MultiSourceBadge />}
              <Text variant="xs" color={palette.textMuted} style={styles.monoText}>
                {timeAgo}
              </Text>
            </View>
          </View>

          {/* Title */}
          <View style={styles.titleRow}>
            {isVideo && (
              <View style={styles.videoBadge}>
                <Text variant="xs" color="#ff0000" style={styles.monoText}>▶</Text>
              </View>
            )}
            <Text
              variant={tier === 'hot' ? 'h3' : tier === 'feature' ? 'lg' : 'body'}
              weight={tier === 'hot' ? 'bold' : tier === 'feature' ? 'semibold' : 'normal'}
              color={
                tier === 'hot'
                  ? mode === 'dark' ? '#fff' : '#1a1a1a'
                  : tier === 'feature'
                  ? mode === 'dark' ? '#eee' : '#222'
                  : palette.text
              }
              numberOfLines={tier === 'hot' ? 5 : 3}
              style={[styles.title, isVideo && styles.titleVideo]}
            >
              {article.title}
            </Text>
          </View>

          {/* Country badge */}
          <View style={[styles.countryBadge, { borderColor: palette.border, backgroundColor: palette.surface2 }]}>
            <Text variant="xs" color={palette.textDim} style={styles.monoText}>
              {article.country.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function HotBadge() {
  return (
    <View style={[styles.badge, styles.badge_hot]}>
      <Text variant="xs" weight="bold" color="#fff" style={styles.monoText}>HOT</Text>
    </View>
  );
}

function MultiSourceBadge() {
  return (
    <View style={[styles.badge, styles.badge_multi]}>
      <Text variant="xs" weight="medium" color="#fff" style={styles.monoText}>multi</Text>
    </View>
  );
}

function formatTimeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  if (diffMins < 1) return 'ahora';
  if (diffMins < 60) return `${diffMins}m`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h`;
  const days = Math.floor(diffHrs / 24);
  if (days === 1) return 'ayer';
  return `${days}d`;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  card_hot: {
    borderRadius: borderRadius.xl,
  },
  card_feature: {},
  card_compact: {},

  accentLine: {
    height: 2,
    width: '100%',
  },
  accentLine_hot: {
    height: 3,
    backgroundColor: '#f97316',
  },
  accentLine_feature: {
    height: 2,
    width: '50%',
    backgroundColor: '#ea580c',
  },

  body: {
    gap: spacing.xs,
  },
  body_hot: {
    padding: spacing.lg,
  },
  body_feature: {
    padding: spacing.md,
  },
  body_compact: {
    padding: spacing.sm + 2,
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: spacing.xs,
    paddingVertical: 1,
  },
  sourceDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  metaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },

  badge: {
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: 1,
  },
  badge_hot: {
    backgroundColor: '#f97316',
  },
  badge_multi: {
    backgroundColor: '#ea580c',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  title: {
    letterSpacing: -0.3,
    flex: 1,
  },
  titleVideo: {
    flex: 1,
  },
  videoBadge: {
    marginTop: 2,
  },

  countryBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: 1,
  },
  monoText: {
    fontFamily: 'monospace',
  },
});
