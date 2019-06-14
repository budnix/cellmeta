const babelPresetConfig = () => ({
  targets: {
    chrome: '41',
    firefox: '34',
    ie: '9',
    safari: '9'
  },
  modules: false,
  debug: false,
  useBuiltIns: 'usage',
  corejs: 3,
});

module.exports = {
  presets: [
    ['@babel/preset-env', babelPresetConfig()]
  ],
  plugins: [
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    ['transform-inline-environment-variables']
  ],
  env: {
    // Environment for unit testing, source code and languages building via webpack (UMD).
    commonjs: {
      plugins: [
        ['@babel/plugin-transform-runtime', {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
        }],
        ['@babel/plugin-transform-modules-commonjs', { loose: true }]
      ]
    },
    // Environment for transpiling files to be compatible with CommonJS.
    commonjs_dist: {
      plugins: [
        ['@babel/plugin-transform-modules-commonjs', { loose: true }],
        ['babel-plugin-transform-require-ignore', { extensions: ['.css'] }]
      ],
      ignore: [
        'src/plugins/**/test/**'
      ]
    },
    // Environment for transpiling files to be compatible with ES Modules.
    es: {
      plugins: [
        ['babel-plugin-transform-require-ignore', { extensions: ['.css'] }]
      ],
      ignore: [
        'src/plugins/**/test/**'
      ]
    },
  },
};
