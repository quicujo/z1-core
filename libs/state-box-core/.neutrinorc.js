const library = require('@neutrinojs/library');

module.exports = {
  options: {
    root: __dirname,
    output: 'dist',
  },
  use: [
    library({
      name: '@z1/lib-state-box-core',
      target: 'web',
      targets: {
        browsers: ['safari >= 6'],
      },
    }),
  ],
};
