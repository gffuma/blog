import './ThemeSwitcher.css'

export default function ThemeSwitcher() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html:
          "<button class='theme-switcher' onclick='switchTheme()'>🌝</button>",
      }}
    />
  )
}
