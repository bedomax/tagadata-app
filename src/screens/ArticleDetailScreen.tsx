import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../theme';
import { useTheme } from '../theme/ThemeContext';
import { Text } from '../components/atoms/Text';
import { getSourceColor } from '../theme/sourceColors';
import type { ArticleDetailScreenProps } from '../navigation/types';

export function ArticleDetailScreen({ route, navigation }: ArticleDetailScreenProps) {
  const { article } = route.params;
  const { mode } = useTheme();
  const palette = colors[mode];
  const insets = useSafeAreaInsets();
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const sourceColor = getSourceColor(article.source);

  // Progress bar animation
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (loading) {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 0.85,
        duration: 1800,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start(() => progress.setValue(0));
    }
  }, [loading]);

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      {/* Browser chrome */}
      <View
        style={[
          styles.chrome,
          {
            backgroundColor: palette.surface,
            borderBottomColor: palette.border,
            paddingTop: insets.top + 6,
          },
        ]}
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={() => {
            if (canGoBack) webViewRef.current?.goBack();
            else navigation.goBack();
          }}
          style={styles.backBtn}
          activeOpacity={0.6}
        >
          <Text variant="lg" weight="bold" color={palette.accent}>‹</Text>
        </TouchableOpacity>

        {/* Center: taga·data logo + source pill */}
        <View style={styles.center}>
          <View style={styles.brandRow}>
            <Text variant="xs" weight="bold" color={palette.text} style={styles.mono}>taga</Text>
            <Text variant="xs" weight="bold" color={palette.accent} style={styles.mono}>data</Text>
          </View>
          <View style={[styles.sourcePill, { borderColor: palette.border, backgroundColor: palette.surface2 }]}>
            <View style={[styles.sourceDot, { backgroundColor: sourceColor }]} />
            <Text variant="xs" color={palette.textDim} numberOfLines={1} style={styles.mono}>
              {article.source}
            </Text>
          </View>
        </View>

        {/* Right controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => webViewRef.current?.reload()}
            style={styles.ctrlBtn}
            activeOpacity={0.6}
          >
            <Text variant="body" color={palette.textDim}>↺</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(article.url)}
            style={styles.ctrlBtn}
            activeOpacity={0.6}
          >
            <Text variant="sm" color={palette.textDim} style={styles.mono}>↗</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress bar */}
      <View style={[styles.progressTrack, { backgroundColor: palette.border }]}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              backgroundColor: palette.accent,
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>

      <WebView
        ref={webViewRef}
        source={{ uri: article.url }}
        style={{ flex: 1 }}
        onNavigationStateChange={(state) => setCanGoBack(state.canGoBack)}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        allowsBackForwardNavigationGestures
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chrome: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    gap: spacing.xs,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  brandRow: {
    flexDirection: 'row',
    gap: 0,
  },
  sourcePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    maxWidth: 180,
  },
  sourceDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctrlBtn: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTrack: {
    height: 2,
  },
  progressFill: {
    height: 2,
  },
  mono: {
    fontFamily: 'monospace',
  },
});
