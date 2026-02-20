import React from 'react';
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Pressable,
} from 'react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { useTheme } from '../../theme/ThemeContext';
import { Text } from '../atoms/Text';

interface AboutModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AboutModal({ visible, onClose }: AboutModalProps) {
  const { mode } = useTheme();
  const palette = colors[mode];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[styles.modal, { backgroundColor: palette.surface, borderColor: palette.border }]}
          onPress={(e) => e.stopPropagation()}
        >
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} hitSlop={8}>
            <Text variant="lg" color={palette.textMuted}>×</Text>
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Title */}
            <View style={styles.titleRow}>
              <Text variant="h3" weight="bold" color={palette.text}>taga</Text>
              <Text variant="h3" weight="bold" color={palette.accent}>data</Text>
            </View>

            <Text variant="sm" color={palette.textDim} style={styles.paragraph}>
              Agregador de noticias en tiempo real para Latinoamérica. Agrupa artículos por tema y los ordena por relevancia.
            </Text>

            {/* Flow diagram */}
            <View style={[styles.diagram, { borderColor: palette.border, backgroundColor: palette.surface2 }]}>
              <Text variant="xs" weight="medium" color={palette.textMuted} style={[styles.mono, styles.diagramLabel]}>
                CÓMO FUNCIONA
              </Text>

              {/* Step 1: Sources */}
              <View style={styles.flowRow}>
                <View style={[styles.sourceBox, { borderColor: palette.border }]}>
                  {['BioBio', 'La Tercera', 'T13', '+ más'].map((s) => (
                    <Text key={s} variant="xs" color={palette.textDim} style={styles.mono}>{s}</Text>
                  ))}
                </View>
                <Text variant="body" color={palette.textMuted}> → </Text>
                <View style={[styles.flowBox, { borderColor: palette.border }]}>
                  <Text variant="xs" weight="medium" color={palette.textDim} style={styles.mono}>crawler</Text>
                  <Text variant="xs" color={palette.textMuted} style={styles.mono}>cada 15m</Text>
                </View>
              </View>

              <View style={[styles.flowDivider, { borderColor: palette.border }]} />

              {/* Step 2: Clustering */}
              <View style={styles.flowRow}>
                <View style={[styles.flowBox, { borderColor: palette.border }]}>
                  <Text variant="xs" weight="medium" color={palette.textDim} style={styles.mono}>NLP</Text>
                  <Text variant="xs" color={palette.textMuted} style={styles.mono}>clustering</Text>
                </View>
                <Text variant="body" color={palette.textMuted}> → </Text>
                <View style={[styles.clusterBox, { borderColor: palette.accent + '66', backgroundColor: palette.accent + '11' }]}>
                  <Text variant="xs" color={palette.accent} style={styles.mono}>cluster_id</Text>
                  <Text variant="xs" color={palette.textMuted} style={styles.mono}>mismo tema</Text>
                </View>
              </View>

              <View style={[styles.flowDivider, { borderColor: palette.border }]} />

              {/* Step 3: Score */}
              <Text variant="xs" weight="medium" color={palette.textMuted} style={[styles.mono, styles.scoreLabel]}>
                SCORE = fuentes × peso
              </Text>
              <View style={styles.scoreRow}>
                {[
                  { label: 'score 0', tier: 'compact', color: palette.textMuted },
                  { label: 'score 1+', tier: 'multi', color: '#ea580c' },
                  { label: 'score 60+', tier: 'HOT', color: '#f97316' },
                ].map((item) => (
                  <View
                    key={item.tier}
                    style={[
                      styles.tierBox,
                      {
                        borderColor: item.color,
                        backgroundColor: item.color + '15',
                      },
                    ]}
                  >
                    <Text variant="xs" weight="bold" color={item.color} style={styles.mono}>
                      {item.tier}
                    </Text>
                    <Text variant="xs" color={palette.textMuted} style={styles.mono}>
                      {item.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <Text variant="sm" color={palette.textDim} style={styles.paragraph}>
              Creado por Bedo, desarrollador indie. El proyecto nació hace 12 años y fue reconstruido desde cero en 2026 usando IA.
            </Text>

            <Text variant="xs" color={palette.textMuted} style={[styles.paragraph, styles.mono]}>
              Fuentes: BioBioChile, La Tercera, Cooperativa, T13, CNN Chile, El Comercio, El Universo y más.
            </Text>

            {/* Social links */}
            <View style={styles.links}>
              <TouchableOpacity
                style={[styles.linkBtn, { borderColor: palette.border }]}
                onPress={() => Linking.openURL('https://x.com/bedomax')}
                activeOpacity={0.7}
              >
                <Text variant="xs" color={palette.accent} style={styles.mono}>X @bedomax</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.linkBtn, { borderColor: palette.border }]}
                onPress={() => Linking.openURL('https://instagram.com/bedomax')}
                activeOpacity={0.7}
              >
                <Text variant="xs" color={palette.accent} style={styles.mono}>IG @bedomax</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modal: {
    width: '100%',
    maxWidth: 560,
    borderWidth: 1,
    borderRadius: borderRadius.xl,
    padding: spacing['2xl'],
    maxHeight: '85%',
  },
  closeBtn: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 1,
    padding: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  paragraph: {
    marginBottom: spacing.md,
    lineHeight: 20,
  },

  // Diagram
  diagram: {
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  diagramLabel: {
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  flowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sourceBox: {
    borderWidth: 1,
    borderRadius: borderRadius.sm,
    padding: spacing.xs,
    gap: 2,
    minWidth: 72,
  },
  flowBox: {
    borderWidth: 1,
    borderRadius: borderRadius.sm,
    padding: spacing.xs,
    alignItems: 'center',
    gap: 1,
  },
  clusterBox: {
    borderWidth: 1,
    borderRadius: borderRadius.sm,
    padding: spacing.xs,
    alignItems: 'center',
    gap: 1,
  },
  flowDivider: {
    borderTopWidth: 1,
    borderStyle: 'dashed',
    marginVertical: spacing.xs,
  },
  scoreLabel: {
    letterSpacing: 0.5,
  },
  scoreRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: 2,
  },
  tierBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: borderRadius.sm,
    padding: spacing.xs,
    alignItems: 'center',
    gap: 1,
  },

  links: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  linkBtn: {
    borderWidth: 1,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  mono: {
    fontFamily: 'monospace',
  },
});
