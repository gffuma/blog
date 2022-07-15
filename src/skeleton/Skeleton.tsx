import find from 'lodash/find'
import path from 'path'
import fs from 'fs'
import { SkeletonProps } from '@pluffa/node-render'

const inlineJS = fs.readFileSync(
  path.resolve(process.cwd(), 'src/inline.js'),
  'utf-8'
)

let inilineCss: string

export default function Skeleton({ appHtml, entrypoints }: SkeletonProps) {
  if (process.env.PLUFFA_BUILD_CLIENT_PATH && !inilineCss) {
    const cssEntry = find(entrypoints.main, (e) => e.endsWith('.css'))!
    inilineCss = fs.readFileSync(
      path.join(process.env.PLUFFA_BUILD_CLIENT_PATH, cssEntry),
      'utf-8'
    )
  }
  return (
    <html lang='en' data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#333842" />
        <link rel="shortcut icon" href="/favicon.ico" />
        {inilineCss ? (
          <style dangerouslySetInnerHTML={{ __html: inilineCss }} />
        ) : (
          <>
            {entrypoints.main
              .filter((e) => e.endsWith('.css'))
              .map((e) => (
                <link key={e} href={`/${e}`} rel="stylesheet" />
              ))}
          </>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: inlineJS,
          }}
        />
      </head>
      <body>
        <div
          id="root"
          dangerouslySetInnerHTML={{
            __html: appHtml,
          }}
        />
      </body>
      {process.env.NODE_ENV !== 'production' && (
        <>
          {entrypoints.main
            .filter((e) => e.endsWith('.js'))
            .map((e) => (
              <script key={e} src={`/${e}`} />
            ))}
        </>
      )}
      {process.env.NODE_ENV === 'production' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `initThemeSwitcher();`,
          }}
        />
      )}
    </html>
  )
}
