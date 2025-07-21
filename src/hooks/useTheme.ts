import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'techy' | 'night';

const themeConfig = {
  light: {
    '--bg-0': '#ffffff',
    '--surface-1': '#f7f7f9',
    '--surface-2': '#ebedf3',
    '--text-primary': '#1e1e20',
    '--text-secondary': '#52525b',
    '--text-muted': '#71717a',
    '--accent-primary': '#275efe',
    '--accent-secondary': '#0ba39c',
  },
  dark: {
    '--bg-0': '#0f111a',
    '--surface-1': '#161a23',
    '--surface-2': '#1e2230',
    '--text-primary': '#e5e7eb',
    '--text-secondary': '#9ca3af',
    '--text-muted': '#6b7280',
    '--accent-primary': '#4f8cff',
    '--accent-secondary': '#00c7b1',
  },
  techy: {
    '--bg-0': '#121212',
    '--surface-1': '#1b1b1b',
    '--surface-2': '#242424',
    '--text-primary': '#e0e0e0',
    '--text-secondary': '#9e9e9e',
    '--text-muted': '#757575',
    '--accent-primary': '#4caf50',
    '--accent-secondary': '#00bfa5',
  },
  night: {
    '--bg-0': '#0a192f',
    '--surface-1': '#12233d',
    '--surface-2': '#1a2b47',
    '--text-primary': '#e6f1ff',
    '--text-secondary': '#a8b8d8',
    '--text-muted': '#8892b0',
    '--accent-primary': '#fcd34d',
    '--accent-secondary': '#38bdf8',
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('xmail-theme');
    const validThemes: Theme[] = ['light', 'dark', 'techy', 'night'];
    return (stored && validThemes.includes(stored as Theme)) ? (stored as Theme) : 'techy';
  });

  useEffect(() => {
    const updateTheme = () => {
      // Remove all theme classes
      document.documentElement.classList.remove('dark', 'techy', 'night');
      
      // Apply CSS variables for current theme
      const config = themeConfig[theme];
      if (!config) {
        console.warn(`Invalid theme: ${theme}. Falling back to 'techy'.`);
        return;
      }
      
      Object.entries(config).forEach(([property, value]) => {
        document.documentElement.style.setProperty(property, value);
      });
      
      // Add theme class for Tailwind variants
      if (theme !== 'light') {
        document.documentElement.classList.add(theme);
      }
      
      // Set color scheme for browser UI
      const colorScheme = theme === 'light' ? 'light' : 'dark';
      document.documentElement.style.setProperty('color-scheme', colorScheme);
    };

    updateTheme();
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('xmail-theme', newTheme);
  };

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'techy', 'night'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    changeTheme(themes[nextIndex]);
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light': return 'Light Mode';
      case 'dark': return 'Dark Mode';
      case 'techy': return 'Techy Green';
      case 'night': return 'Night Sky';
      default: return 'Light Mode';
    }
  };

  return { theme, changeTheme, cycleTheme, getThemeLabel };
};