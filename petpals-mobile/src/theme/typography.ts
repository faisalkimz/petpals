export const typography = {
    // Font Families
    fontFamily: {
        regular: 'System',
        medium: 'System',
        bold: 'System',
        semiBold: 'System',
    },

    // Font Sizes
    fontSize: {
        xs: 10,
        sm: 12,
        base: 14,
        md: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 28,
        '4xl': 32,
        '5xl': 40,
    },

    // Font Weights
    fontWeight: {
        regular: '400' as const,
        medium: '500' as const,
        semiBold: '600' as const,
        bold: '700' as const,
    },

    // Line Heights
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
};

export type Typography = typeof typography;
