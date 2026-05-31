/**
 * Layout global
 */
export const FINAL = 48;

/** Altura oficial da barra de navegação inferior */
export const TAB_BAR_HEIGHT = 78;

/** Distância padrão do Floating Action Button até a base da tela */
export const FAB_BOTTOM = 96;

/** Tamanhos de ícones
 */
export const ICON_SIZE = {
  /** 16px */
  xs: 16,

  /** 18px */
  sm: 18,

  /** 22px */
  md: 22,

  /** 28px */
  lg: 28,

  /** 32px */
  xl: 32,

  /** 34px */
  xxl: 34,
} as const;

/** Tamanhos de fonte
 */
export const FONT_SIZE = {
  /** 12px */
  xs: 12,

  /** 15px */
  sm: 15,

  /** 16px */
  md: 16,

  /** 18px */
  lg: 18,

  /** 22px */
  xl: 22,

  /** 28px */
  xxl: 28,
} as const;

/** Raios de borda
 */
export const RADIUS = {
  /** 8px */
  xs: 8,

  /** 10px */
  sm: 10,

  /** 14px */
  md: 14,

  /** 18px */
  lg: 18,

  /** 24px */
  xl: 24,

  /** Pill/Circle */
  full: 999,
} as const;

/** Espaçamentos
 */
export const SPACING = {
  /** 4px */
  xs: 4,

  /** 8px */
  sm: 8,

  /** 12px */
  md: 12,

  /** 16px */
  lg: 16,

  /** 20px */
  xl: 20,

  /** 28px */
  xxl: 28,
} as const;

/** Sombras
 */
export const SHADOWS = {
  /** Sombra padrão para cards e containers */
  card: {
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  /** Sombra para elementos flutuantes (FAB, modais pequenos, botões) */
  floating: {
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
} as const;
