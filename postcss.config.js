// module.exports = {
//   plugins: [
//     require('autoprefixer')
//   ]
// }
module.exports = {
  plugins: [
    require('postcss-preset-env')({
      browsers: 'last 2 versions'
    })
  ]
};
