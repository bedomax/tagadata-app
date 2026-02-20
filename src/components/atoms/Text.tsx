import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';
import { useTheme } from '../../theme/ThemeContext';

type Variant = 'h1' | 'h2' | 'h3' | 'lg' | 'body' | 'sm' | 'xs' | 'mono';
type Weight = 'normal' | 'medium' | 'semibold' | 'bold';

interface TextProps extends RNTextProps {
  variant?: Variant;
  weight?: Weight;
  color?: string;
  children: React.ReactNode;
}

export function Text({ variant = 'body', weight = 'normal', color, style, children, ...rest }: TextProps) {
  const { mode } = useTheme();
  const palette = colors[mode];

  const defaultColor = color ?? palette.text;

  return (
    <RNText
      style={[styles[variant], { color: defaultColor, fontWeight: typography.fontWeight[weight] }, style]}
      {...rest}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: typography.fontSize['4xl'],
    lineHeight: 40,
  },
  h2: {
    fontSize: typography.fontSize['3xl'],
    lineHeight: 32,
  },
  h3: {
    fontSize: typography.fontSize['2xl'],
    lineHeight: 28,
  },
  lg: {
    fontSize: typography.fontSize.lg,
    lineHeight: 24,
  },
  body: {
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,
  },
  sm: {
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.tight,
  },
  xs: {
    fontSize: typography.fontSize.xs,
    lineHeight: 14,
  },
  mono: {
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.tight,
    fontFamily: 'monospace',
  },
});
