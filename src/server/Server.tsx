import fs from 'node:fs/promises'
import path from 'node:path'
import { HelmetProvider, FilledContext } from 'react-helmet-async'
import { GetServerData } from '@pluffa/node-render'
import { useSSRData, useSSRUrl } from '@pluffa/ssr'
import { StaticRouter } from 'react-router-dom/server'
import { ResourceCache, ResourceCacheContext } from '../cache'
import App from '../App'

export default function Server() {
  const { cache, helmetContext } = useSSRData<{
    cache: ResourceCache
    helmetContext: FilledContext
  }>()
  const url = useSSRUrl()
  return (
    <HelmetProvider context={helmetContext}>
      <ResourceCacheContext.Provider value={cache}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </ResourceCacheContext.Provider>
    </HelmetProvider>
  )
}

// NOTE: No need to execute per request
// cache at module level
// ... on dev the server hot reload will re-execute the whole file
let __lazyInlineJS: string
let __lazyInlinceCss: string

export const getServerData: GetServerData = async ({ entrypoints }) => {
  const cache = new Map()
  const helmetContext = {} as FilledContext

  let injectHead = ''
  let injectBody = ''

  // Inline CSS
  if (process.env.PLUFFA_BUILD_CLIENT_PATH && !__lazyInlinceCss) {
    __lazyInlinceCss = await Promise.all(
      entrypoints.main
        .filter((e) => e.endsWith('.css'))
        .map((e) =>
          fs
            .readFile(
              path.join(process.env.PLUFFA_BUILD_CLIENT_PATH!, e),
              'utf-8'
            )
            .then((css) => `<style>${css}</style>`)
        )
    ).then((strs) => strs.join(''))
  }
  if (__lazyInlinceCss) {
    injectHead += __lazyInlinceCss
  }

  // Inline JS
  if (!__lazyInlineJS) {
    __lazyInlineJS = await fs.readFile(
      path.resolve(process.cwd(), 'src/inline.js'),
      'utf-8'
    )
  }
  injectHead += `<script>${__lazyInlineJS}</script>`

  // Bootstrap JS
  if (process.env.NODE_ENV === 'production') {
    injectBody += `<script>initThemeSwitcher();</script>`
  }

  return {
    data: {
      cache,
      helmetContext,
    },
    injectBeforeHeadClose: () =>
      (['title', 'meta', 'link'] as const)
        .map((k) =>
          helmetContext.helmet ? helmetContext.helmet[k].toString() : ''
        )
        .join('') + injectHead,
    injectBeforeBodyClose: () => injectBody,
  }
}
