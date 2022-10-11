/// <reference types="pluffa" />
interface Window {
  __theme?: 'dark' | 'light'
  initThemeSwitcher(): void
  switchTheme(): void
}

namespace JSX {
  interface IntrinsicElements {
    'theme-switcher': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
  }
}
