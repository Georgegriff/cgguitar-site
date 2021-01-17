const { src, dest } = require('gulp');

const scripts = "./src/_includes/scripts"
function js() {
  return src('./src/scripts/**/**/*.js')
    .pipe(dest(scripts));
}

module.exports = js;