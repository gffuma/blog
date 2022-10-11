import { Scripts, Root } from '@pluffa/ssr/skeleton'
import { DEFAULT_THEME } from '../theme'

export default function Skeleton() {
  return (
    <html lang="en" data-theme={DEFAULT_THEME}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#333842" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <div id="root">
          <Root />
        </div>
        {process.env.NODE_ENV !== 'production' && <Scripts />}
      </body>
    </html>
  )
}
