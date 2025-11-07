/**
 * Font Master Pro - Presets Module
 * Defines predefined font themes for quick application
 */

const PRESETS = {
  modern: {
    name: 'Modern',
    description: 'Clean, contemporary design',
    settings: {
      fontFamily: 'Inter',
      fontSize: 16,
      lineHeight: 1.6,
      letterSpacing: 0,
      textShadow: {
        enabled: false,
        x: 0,
        y: 0,
        blur: 0,
        color: '#000000'
      }
    }
  },

  classic: {
    name: 'Classic',
    description: 'Traditional serif style',
    settings: {
      fontFamily: 'Merriweather',
      fontSize: 17,
      lineHeight: 1.8,
      letterSpacing: 0.5,
      textShadow: {
        enabled: true,
        x: 1,
        y: 1,
        blur: 0,
        color: '#cccccc'
      }
    }
  },

  dyslexic: {
    name: 'Dyslexic-Friendly',
    description: 'Easy to read, high clarity',
    settings: {
      fontFamily: 'Open Sans',
      fontSize: 18,
      lineHeight: 2.0,
      letterSpacing: 1.5,
      textShadow: {
        enabled: false,
        x: 0,
        y: 0,
        blur: 0,
        color: '#000000'
      }
    }
  },

  professional: {
    name: 'Professional',
    description: 'Business-ready appearance',
    settings: {
      fontFamily: 'Roboto',
      fontSize: 15,
      lineHeight: 1.5,
      letterSpacing: 0.3,
      textShadow: {
        enabled: true,
        x: 1,
        y: 0,
        blur: 1,
        color: '#777777'
      }
    }
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PRESETS;
}
