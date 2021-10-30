const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:8071',
        changeOrigin: true,
      },
    },
  },
  pwa: {
    iconPaths: {
      msTileImage: 'img/icons/mstile-150x150.png',
    },
  },
};
