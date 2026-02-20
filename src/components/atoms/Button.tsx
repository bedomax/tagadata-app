import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { useTheme } from '../../theme/ThemeContext';
import { Text } from './Text';

type Variant = 'primary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  const { mode } = useTheme();
  const palette = colors[mode];

  const containerStyles: ViewStyle[] = [
    styles.base,
    styles[size],
    variantStyle(variant, palette),
    ...(disabled || loading ? [styles.disabled] : []),
    ...(style ? [style] : []),
  ];

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#fff' : palette.accent}
        />
      ) : (
        <Text
          variant={size === 'sm' ? 'sm' : 'body'}
          weight="semibold"
          color={variant === 'primary' ? '#fff' : palette.accent}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

function variantStyle(variant: Variant, palette: typeof colors.dark): ViewStyle {
  switch (variant) {
    case 'primary':
      return { backgroundColor: palette.accent };
    case 'outline':
      return { backgroundColor: 'transparent', borderWidth: 1, borderColor: palette.accent };
    case 'ghost':
      return { backgroundColor: 'transparent' };
  }
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sm: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    minHeight: 30,
  },
  md: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm + 2,
    minHeight: 40,
  },
  lg: {
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.md,
    minHeight: 48,
  },
  disabled: {
    opacity: 0.45,
  },
});
