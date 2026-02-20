import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../theme';
import { useTheme } from '../../theme/ThemeContext';
import { Text } from '../atoms/Text';
import { LiveDot } from '../atoms/LiveDot';

export type Country = 'cl' | 'ec';

const ACTIVE_COUNTRIES: { value: Country; flag: string; label: string }[] = [
  { value: 'cl', flag: '🇨🇱', label: 'Chile' },
  { value: 'ec', flag: '🇪🇨', label: 'Ecuador' },
];

const COMING_SOON = [
  { flag: '🇦🇷', label: 'Argentina' },
  { flag: '🇲🇽', label: 'México' },
  { flag: '🇨🇴', label: 'Colombia' },
  { flag: '🇵🇪', label: 'Perú' },
];

interface HeaderProps {
  lastUpdated: string | null;
  country: Country;
  onLogoPress: () => void;
  onAboutPress: () => void;
  onCountryChange: (country: Country) => void;
}

export function Header({
  lastUpdated,
  country,
  onLogoPress,
  onAboutPress,
  onCountryChange,
}: HeaderProps) {
  const { mode, toggle } = useTheme();
  const palette = colors[mode];
  const insets = useSafeAreaInsets();
  const [countryModalOpen, setCountryModalOpen] = useState(false);

  const timeAgo = lastUpdated ? formatTimeAgo(lastUpdated) : null;
  const currentCountry = ACTIVE_COUNTRIES.find((c) => c.value === country)!;

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: palette.surface,
            borderBottomColor: palette.border,
            paddingTop: insets.top + spacing.md,
          },
        ]}
      >
        {/* Row 1: Logo + controls */}
        <View style={styles.row}>
          <TouchableOpacity onPress={onLogoPress} activeOpacity={0.7}>
            <View style={styles.logo}>
              <Text variant="lg" weight="bold" color={palette.text}>taga</Text>
              <Text variant="lg" weight="bold" color={palette.accent}>data</Text>
              <LiveDot color={palette.accent} size={7} />
            </View>
          </TouchableOpacity>

          <View style={styles.spacer} />

          {/* Country selector */}
          <TouchableOpacity
            onPress={() => setCountryModalOpen(true)}
            style={[styles.countryBtn, { borderColor: palette.border, backgroundColor: palette.surface2 }]}
            activeOpacity={0.7}
          >
            <Text variant="sm">{currentCountry.flag}</Text>
            <Text variant="xs" weight="medium" color={palette.text} style={styles.monoText}>
              {currentCountry.label}
            </Text>
            <Text variant="xs" color={palette.textMuted} style={styles.monoText}>▾</Text>
          </TouchableOpacity>

          {/* Theme toggle */}
          <TouchableOpacity
            onPress={toggle}
            style={[styles.iconBtn, { borderColor: palette.border, backgroundColor: palette.surface2 }]}
            activeOpacity={0.7}
          >
            <Text variant="body" color={palette.textDim}>
              {mode === 'dark' ? '☀' : '☾'}
            </Text>
          </TouchableOpacity>

          {/* About */}
          <TouchableOpacity
            onPress={onAboutPress}
            style={[styles.iconBtn, { borderColor: palette.border, backgroundColor: palette.surface2 }]}
            activeOpacity={0.7}
          >
            <Text variant="sm" weight="bold" color={palette.textDim} style={styles.monoText}>?</Text>
          </TouchableOpacity>
        </View>

        {/* Row 2: Live + last updated */}
        <View style={styles.subRow}>
          <View style={styles.liveIndicator}>
            <LiveDot color={palette.green} size={5} />
            <Text variant="xs" color={palette.textMuted} style={styles.monoText}>en vivo</Text>
          </View>

          {timeAgo && (
            <Text variant="xs" color={palette.textMuted} style={styles.monoText}>
              {'actualizado '}
              <Text variant="xs" weight="medium" color={palette.textDim}>{timeAgo}</Text>
            </Text>
          )}
        </View>
      </View>

      {/* Country picker modal */}
      <Modal
        visible={countryModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setCountryModalOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setCountryModalOpen(false)}>
          <Pressable
            style={[styles.sheet, { backgroundColor: palette.surface, borderColor: palette.border }]}
            onPress={(e) => e.stopPropagation()}
          >
            <Text variant="xs" weight="medium" color={palette.textMuted} style={[styles.monoText, styles.sheetTitle]}>
              SELECCIONAR PAÍS
            </Text>

            {/* Active countries */}
            {ACTIVE_COUNTRIES.map((c) => {
              const isSelected = c.value === country;
              return (
                <TouchableOpacity
                  key={c.value}
                  onPress={() => {
                    onCountryChange(c.value);
                    setCountryModalOpen(false);
                  }}
                  activeOpacity={0.7}
                  style={[
                    styles.countryOption,
                    isSelected && { backgroundColor: palette.accentGlow },
                    { borderColor: isSelected ? palette.accent : palette.border },
                  ]}
                >
                  <Text variant="body">{c.flag}</Text>
                  <Text
                    variant="body"
                    weight={isSelected ? 'semibold' : 'normal'}
                    color={isSelected ? palette.accent : palette.text}
                  >
                    {c.label}
                  </Text>
                  {isSelected && (
                    <Text variant="xs" color={palette.accent} style={styles.monoText}>✓</Text>
                  )}
                </TouchableOpacity>
              );
            })}

            {/* Divider + coming soon */}
            <View style={[styles.divider, { borderTopColor: palette.border }]} />

            <Text variant="xs" color={palette.textMuted} style={[styles.monoText, styles.comingSoonLabel]}>
              PRÓXIMAMENTE
            </Text>

            {COMING_SOON.map((c) => (
              <View
                key={c.label}
                style={[styles.countryOption, styles.countryOptionDisabled, { borderColor: palette.border }]}
              >
                <Text variant="body" style={styles.dimmed}>{c.flag}</Text>
                <Text variant="body" color={palette.textMuted}>{c.label}</Text>
                <View style={[styles.soonBadge, { borderColor: palette.border }]}>
                  <Text variant="xs" color={palette.textMuted} style={styles.monoText}>pronto</Text>
                </View>
              </View>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

function formatTimeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  if (diffMins < 1) return 'ahora';
  if (diffMins < 60) return `${diffMins}m`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h`;
  return `${Math.floor(diffHrs / 24)}d`;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  spacer: { flex: 1 },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  countryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monoText: { fontFamily: 'monospace' },

  // Modal
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: spacing.lg,
    paddingBottom: spacing['3xl'],
    gap: spacing.xs,
  },
  sheetTitle: {
    marginBottom: spacing.sm,
    letterSpacing: 1,
  },
  countryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  countryOptionDisabled: {
    opacity: 0.5,
  },
  dimmed: {
    opacity: 0.5,
  },
  soonBadge: {
    marginLeft: 'auto',
    borderWidth: 1,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  divider: {
    borderTopWidth: 1,
    marginVertical: spacing.sm,
  },
  comingSoonLabel: {
    marginBottom: spacing.xs,
    letterSpacing: 1,
  },
});
