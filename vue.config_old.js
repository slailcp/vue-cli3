var path = require("path");
var api = require("./src/utils/api.js").api;
function resolve(dir) {
    console.log(path.join(__dirname, dir));
    return path.join(__dirname, dir);
}


console.log('******************')
console.log(process.argv[3])
console.log(process.env)
console.log('******************')

// 默认 index debug
const ServerSign = process.argv[3].replace('--', '') || 'index'; // 运行 时候的标记 pc 还是h5 // npm run serve-index    ServerSign = index;
const BuildSign = process.argv[3] || 'index'; // 打包时候的标记 pc 还是h5 // npm run Release-index    BuildSign = index;
const BuildNODE_ENV = process.argv[4] || 'debug'; // process.argv[4]; // 打包时候的环境变量标记 Debug/Publictest/Release // npm run Release-index   BuildNODE_ENV = Release;

if(process.env.NODE_ENV == 'development'){
  api('development');
}else{
  api(BuildNODE_ENV);
}

// 根据入口来设置pages 
function setPage() {
  const pages = new Map([
    ['h5',{
      h5: {
        entry: "src/h5-project/main.ts",
        template: "src/public/h5.html",
        filename: "index.html",
        title: "vue-h5",
        chunks: ["chunk-vendors", "chunk-common", "h5"]
      }
    }],
    ['index', {
      index: {
        entry: "src/pc-project/main.ts",
        template: "src/public/index.html",
        filename: "index.html",
        title: "vue-pc",
        chunks: ["chunk-vendors", "chunk-common", "index"]
      }
    }],
  ])


  let page = {}
  if (process.env.NODE_ENV == 'development') {
    page = pages.get(ServerSign) || pages.get('index');
  } else {
    page = pages.get(BuildSign) || pages.get(index);
  }
  return page;
}

function setOutputDir() {
  const arr = new Map([
    ['index_debug', 'PublishTarget/Debug/pc'],
    ['index_test1', 'PublishTarget/PublishTest01/pc'],
    ['index_test2', 'PublishTarget/PublishTest02/pc'],
    ['index_release', 'PublishTarget/Release/pc'],
    ['h5_debug', 'PublishTarget/Debug/h5'],
    ['h5_test1', 'PublishTarget/PublishTest01/h5'],
    ['h5_test2', 'PublishTarget/PublishTest02/h5'],
    ['h5_release', 'PublishTarget/Release/h5'],
  ])

  var arg = BuildSign;
  var NODE_ENV = BuildNODE_ENV; 
  // 由于cli的环境变量只有development和production和test, cross-env或者--mode更改NODE_ENV,cli会当做development处理,所以打包出来的文件石问题的
  // 打印process.argv可以看到,运行的命令所带的参数,第5个就是我们设置的环境变量.
  // npm run Debug-pc    NODE_ENV = Debug;
  var outputDir = arr.get(arg+'_'+NODE_ENV) || 'PublishTarget/Debug';
  return outputDir;
}



// console.log('+++++++++++++');
// console.log('ServerSign:'+ServerSign+'|BuildSign:'+BuildSign+'|BuildNODE_ENV:'+BuildNODE_ENV);
// console.log('NODE_ENV:'+process.env.NODE_ENV);
// console.log('OutputDir:'+setOutputDir());
// console.log('+++++++++++++');

// 
module.exports = {
    lintOnSave: false,
    publicPath: "./",
    outputDir:process.env.NODE_ENV == 'development'?'PublishTarget/Debug':setOutputDir() ,
    // assetsDir:'static/',
    // chainWebpack: (config) => { // 更加细致的配置内部的webpack选项
    //     config.resolve.alias
    //     .set('src', resolve('src'))
    //     .set('pc', resolve('src/pc-project/'))
    //     .set('h5', resolve('src/h5Project/'))
    //     .set('dmoain', resolve('src/domain'))
    //     .end()
    // },
    pages: setPage(),
    filenameHashing: true,
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
};