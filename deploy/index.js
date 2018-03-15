var co = require('co');
var OSS = require('ali-oss')
var path = require('path');
var client = new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: 'KyVKg6tfdreplWYe',
    accessKeySecret: 'mg9bzeiZKfCiBfi6v2KtSZMZKr2QUB',
    bucket: 'dadigua'
});
// co(function* () {
//     client.useBucket('dadigua');
//     var result = yield client.list({
//       'max-keys': 5
//     });
//     console.log(result);
//   }).catch(function (err) {
//     console.log('err',err);
//   });
console.log(__dirname)

co(function* () {
    var result = yield client.put('hypergl/deploy/index.js', path.resolve(__dirname, '../build/index.js'));
    console.log(result);
}).catch(function (err) {
    console.log(err);
});