var path = require("path");
function resolve(dir) {
    console.log(path.join(__dirname, dir));
    return path.join(__dirname, dir);
}

const ServerSign = process.argv[6] || 'index'; // 运行 时候的标记 pc 还是h5 // npm run serve-index    ServerSign = index;
const env = process.argv[4] || 'debug'; // 当前环境 eg:prod
let type = process.argv[5] || 'pc'; // 当前打包h5还是pc;
if(type === 'pc') { type = 'index'; };

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
    page = pages.get(type) || pages.get('index');
  }
  return page;
}

function setOutputDir() {
  const arr = new Map([
    ['index_debug', 'PublishTarget/Debug/pc'],
    ['index_test01', 'PublishTarget/PublishTest01/pc'],
    ['index_test02', 'PublishTarget/PublishTest02/pc'],
    ['index_prod', 'PublishTarget/Release/pc'],
    ['h5_debug', 'PublishTarget/Debug/h5'],
    ['h5_test01', 'PublishTarget/PublishTest01/h5'],
    ['h5_test02', 'PublishTarget/PublishTest02/h5'],
    ['h5_prod', 'PublishTarget/Release/h5'],
  ])

  var outputDir = arr.get(type+'_'+env) || 'PublishTarget/Debug';
  return outputDir;
}

module.exports = {
    lintOnSave: false,
    publicPath: "./",
    outputDir:process.env.NODE_ENV == 'development'?'PublishTarget/Debug':setOutputDir() ,
    pages: setPage(),
    filenameHashing: true,
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
};