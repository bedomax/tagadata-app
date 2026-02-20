import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import { useTheme } from '../../theme/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, style, padding = 'md' }: CardProps) {
  const { mode } = useTheme();
  const palette = colors[mode];
  const shadow = shadows[mode].card;

  return (
    <View
      style={[
        styles.base,
        paddingStyle[padding],
        {
          backgroundColor: palette.surface,
          borderColor: palette.border,
          ...shadow,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const paddingStyle: Record<string, ViewStyle> = {
  none: { padding: 0 },
  sm: { padding: spacing.sm },
  md: { padding: spacing.md },
  lg: { padding: spacing.lg },
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
