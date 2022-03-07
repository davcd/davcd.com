const bs = require('browser-sync').create()
const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const pug = require('gulp-pug')
const htmlMin = require('gulp-htmlmin')
const cleanCss = require('gulp-clean-css')

const fs = require('fs')

function clean (cb) {
  if (fs.existsSync('out')) {
    fs.rmdirSync('out', { recursive: true })
  }
  cb()
}

function scss () {
  return src('lib/scss/**.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(dest('out/css'))
}

function publicFolder () {
  return src('lib/public/**')
    .pipe(dest('out'))
}

function html () {
  return src('lib/index.pug')
    .pipe(pug())
    .pipe(htmlMin({
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      removeComments: true
    }))
    .pipe(dest('out'))
}

function serve () {
  bs.init({
    server: {
      baseDir: 'out',
      index: 'index.html'
    },
    ui: false,
    open: false
  })

  watch('lib/scss/**.scss', scss)
  watch('lib/public/**', publicFolder)
  watch(['lib/**', '!lib/css/**.scss', '!lib/public/**'], html)
  watch('lib/**').on('change', bs.reload)
}

exports.build = series(clean, scss, publicFolder, html)
exports.default = series(scss, publicFolder, html, serve)
