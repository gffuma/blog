import { useEffect } from 'react'
import './ThemeSwitcher.css'

export default function ThemeSwitcher() {
  useEffect(() => {
    window.initThemeSwitcher()
  }, [])

  return (
    <div
      dangerouslySetInnerHTML={{
        __html:
          "<button class='theme-switcher theme-switcher-hidden' onclick='switchTheme()'>🌝</button>",
      }}
    />
  )
}
