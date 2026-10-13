// LearnLoop Theme Manager (System Default, localStorage, HTML .dark Class)
const THEME_KEY = 'learnloop_theme';

/**
 * Resolves the initial theme:
 * 1. Checks localStorage for a saved preference ('light' | 'dark').
 * 2. If none, falls back to the system media query (prefers-color-scheme).
 * 3. Defaults to 'light' if undetermined.
 */
export const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_KEY) || localStorage.getItem('codeknot_theme');
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (e) {
    // Silently handle storage access exceptions in restricted iframes
  }
  return 'light';
};

/**
 * Applies the given theme to document.documentElement and syncs localStorage.
 * @param {'light' | 'dark'} theme
 */
export const applyTheme = (theme) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {}
};
