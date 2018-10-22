const gulp = require('gulp')
const server = require('gulp-webserver')
const sass = require('gulp-sass')
const webpack = require('webpack-stream')
const watch = require('gulp-watch')
const proxy = require('http-proxy-middleware')

// CommonJS规范做JS模块化
gulp.task('packjs', () => {
  return gulp.src('./src/scripts/*.js')
    .pipe(webpack({
      mode: 'development',
      entry: {
        app: ['@babel/polyfill', './src/scripts/app.js'],
        appHot: ['@babel/polyfill', './src/scripts/appHot.js'],
        appCateDetails: ['@babel/polyfill', './src/scripts/appCateDetails.js'],
        tran: ['@babel/polyfill', './src/scripts/tran.js'],
        industry: ['@babel/polyfill', './src/scripts/industry.js'],
        service: ['@babel/polyfill', './src/scripts/service.js']
      },
      output: {
        filename: '[name].js',
      },
      module: {
        rules: [{
            test: /\.html$/,
            use: ['string-loader']
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest('./dev/scripts'))
})

// 编译sass
gulp.task('packscss', () => {
  return gulp.src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dev/styles'))
})

// 启动一个web-server,应用的插件是gulp-webserver
gulp.task('server', () => {
  return gulp.src('./dev')
    .pipe(server({
      host: 'localhost',
      port: 8800,
      livereload: true,
      middleware: [
        proxy('/search', {
          target: 'https://m.zbj.com',
          changeOrigin: true
        }),
        proxy('/shop', {
          target: 'https://m.zbj.com',
          changeOrigin: true
        }),
        proxy('/getHotWord', {
          target: 'https://m.zbj.com',
          changeOrigin: true
        }),
        proxy('/city', {
          target: 'https://m.zbj.com',
          changeOrigin: true
        }),
        proxy('/shunt', {
          target: 'https://m.zbj.com',
          changeOrigin: true
        }),
        proxy('/api', {
          target: 'http://localhost:3000',
          changeOrigin: true
        }),
        //https://m.zbj.com/case/search/v2/
        proxy('/case', {
          target: "https://m.zbj.com",
          changeOrigin: true
        }),
        proxy('/hallapi', {
          //https://task.zbj.com/hallapi/v/index/list?cndr=&pageNum=2&pageSize=15
          target: "https://task.zbj.com",
          changeOrigin: true
        })
      ]
    }))
})

// copy index.html
gulp.task('copyhtml', () => {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dev/'))
})

//copy img
gulp.task('copyimg', () => {
  return gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./dev/img'))
})

// copy iconfonts
gulp.task('copyicons', () => {
  return gulp.src('./src/iconfonts/**/*')
    .pipe(gulp.dest('./dev/iconfonts'))
})

// copy libs
gulp.task('copylibs', () => {
  return gulp.src('./src/libs/**/*')
    .pipe(gulp.dest('./dev/libs'))
})

// copy mock
gulp.task('copymock', () => {
  return gulp.src('./src/mock/**/*')
    .pipe(gulp.dest('./dev/mock'))
})

// 文件修改 watch
gulp.task('watch', () => {
  gulp.watch('./src/*.html', ['copyhtml'])
  // gulp-watch,实现文件的创建，修改，删除 watch
  // 缺点：某些操作系统不支持
  gulp.watch('./src/styles/**/*', ['packscss'])
  gulp.watch('./src/libs/**/*', ['copylibs'])

  // watch('./src/mock/**/*', () => {
  //   gulp.start(['copymock'])
  // })
  gulp.watch('./src/scripts/**/*', ['packjs'])
})

// default task
gulp.task('default', ['packscss', 'packjs', 'copyhtml', 'copyicons', 'copyimg', 'copylibs', 'server', 'watch'], () => {
  console.log('all works!')
})