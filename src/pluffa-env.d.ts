/// <reference types="pluffa" />

interface Window {
  __theme?: 'dark' | 'light'
  initThemeSwitcher(): void
  switchTheme(): void
}