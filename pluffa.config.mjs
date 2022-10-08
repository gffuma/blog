/**
 * @param {import('pluffa/config').CommandName} cmd
 * @return {Promise<import('@pluffa/node/config').NodeConfig>}
 */
export default async (cmd) => {
  return {
    runtime: 'node',
    clientEntry: './src/index.tsx',
    serverComponent: './src/server/Server.tsx',
    skeletonComponent: './src/server/Skeleton.tsx',
    clientSourceMap: cmd === 'dev' ? true : false,
    exitStaticizeOnError: true,
    experimentalUseSwc: true,
    urls: ['/', '/404.html'],
  }
}
