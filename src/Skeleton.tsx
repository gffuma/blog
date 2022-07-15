import { SkeletonProps } from '@pluffa/node-render'

export default function Skeleton({ appHtml, entrypoints }: SkeletonProps) {
  return (
    <html data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#333842"/>
        <link rel="shortcut icon" href="/favicon.ico" />
        {entrypoints.main
          .filter((e) => e.endsWith('.css'))
          .map((e) => (
            <link key={e} href={`/${e}`} rel="stylesheet" />
          ))}
      </head>
      <body>
        <div
          id="root"
          dangerouslySetInnerHTML={{
            __html: appHtml,
          }}
        />
      </body>
      {process.env.NOD_ENV !== 'production' && (
        <>
          {/* NOTE: HOT RELOAD IN DEV BRODY */}
          {entrypoints.main
            .filter((e) => e.endsWith('.js'))
            .map((e) => (
              <script key={e} src={`/${e}`} />
            ))}
        </>
      )}
      {/* NOTE: The only javascript you need lol */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
      function switchTheme(e) {
        const themeCtrl = document.querySelector('.theme-switcher')
        const myHtml = document.querySelector('html')
        const metaTheme = document.querySelector('meta[name="theme-color"]')
        myHtml.classList.add('animation')
        const currentTheme = myHtml.getAttribute('data-theme')
        let nextTheme
        let nextEmoji
        if (currentTheme === 'dark') {
          nextTheme = 'light'
          nextEmoji = '🌞'
          metaTheme.setAttribute('content', 'white')
        } else {
          nextTheme = 'dark'
          nextEmoji = '🌝'
          metaTheme.setAttribute('content', '#333842')
        }
        myHtml.setAttribute('data-theme', nextTheme)
        themeCtrl.textContent = nextEmoji
      }
      `,
        }}
      />
    </html>
  )
}
