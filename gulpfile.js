const gulp = require('gulp')
const replace = require('gulp-replace')

var co = require('co');
var fs = require('fs');
var OSS = require('ali-oss')
var path = require('path');
var client = new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: 'KyVKg6tfdreplWYe',
    accessKeySecret: 'mg9bzeiZKfCiBfi6v2KtSZMZKr2QUB',
    bucket: 'dadigua'
});



gulp.task('replace', function (cb) {
    gulp.src('./build/**')
        .pipe(replace('script src="', 'script src="http://dadigua.oss-cn-shenzhen.aliyuncs.com/hypergl/deploy/'))
        .pipe(replace('sourceMappingURL=', 'sourceMappingURL=http://dadigua.oss-cn-shenzhen.aliyuncs.com/hypergl/deploy/'))
        .pipe(gulp.dest('deploy'))
    cb();
});

gulp.task('upload', ['replace'], function (cb) {
    fs.readdir(path.resolve(__dirname, './deploy'), 'utf8', function (err, files) {

        co(function* () {
            for (let i = 0; i < files.length; i++) {
                file = files[i]
                var result = yield client.put('hypergl/deploy/' + file, path.resolve(__dirname, './deploy/' + file));
                console.log(result.url);
            }
        }).then(cb).catch(function (err) {
            console.log(err);
        });
    })
});

