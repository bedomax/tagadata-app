// Per-source brand colors with glow
export const sourceColors: Record<string, string> = {
  // Chile
  biobiochile: '#e63946',
  cooperativa: '#2196f3',
  'la tercera': '#ff9800',
  'ciper chile': '#4caf50',
  'the clinic': '#9c27b0',
  interferencia: '#00bcd4',
  'el desconcierto': '#ff5722',
  t13: '#0d47a1',
  'cnn chile': '#c62828',
  'chv noticias': '#1565c0',
  meganoticias: '#f57f17',
  // Ecuador
  'el comercio': '#1a5276',
  'el universo': '#e74c3c',
  'metro ecuador': '#2ecc71',
  gk: '#f39c12',
  'la barra espaciadora': '#8e44ad',
  'plan v': '#e67e22',
  confirmado: '#3498db',
  ecuavisa: '#d32f2f',
  teleamazonas: '#1976d2',
};

export function getSourceColor(source: string): string {
  return sourceColors[source.toLowerCase()] ?? '#f97316';
}
