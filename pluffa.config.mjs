/**
 * @param {import('pluffa/config').CommandName} cmd
 * @return {Promise<import('@pluffa/node/config').NodeConfig>}
 */
export default async (cmd) => {
  return {
    runtime: 'node',
    clientEntry: {
      main: './src/index.tsx',
      inline: './src/inline.ts',
    },
    serverComponent: './src/server/Server.tsx',
    skeletonComponent: './src/server/Skeleton.tsx',
    clientSourceMap: cmd === 'dev' ? true : false,
    exitStaticizeOnError: true,
    experimentalUseSwc: true,
    urls: ['/', '/404.html'],
    experimentalConfigureWebpackClient: (config) => {
      if (cmd === 'dev') {
        // https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/88#issuecomment-627558799
        config.optimization = { runtimeChunk: 'single' }
      }
      return config
    },
  }
}
