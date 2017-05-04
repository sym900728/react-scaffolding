// postcss config
const postcssConfig = {
  plugins: [
    // require('precss'),
    require('autoprefixer')({
      add: true,
      remove: false,
      browsers: ['last 2 versions']
    })
  ]
}

module.exports = postcssConfig;
