// const envMap = new Map([
//     ['debug', { pc: 'http://www.debug-PC.com', h5: 'http://www.debug-h5.com' }],
//     ['test1', { pc: 'http://www.test1-PC.com', h5: 'http://www.test1-h5.com' }],
//     ['test2', { pc: 'http://www.test2-PC.com', h5: 'http://www.test2-h5.com' }],
//     ['release', { pc: 'http://www.release-PC.com', h5: 'http://www.release-h5.com' }],
//     ['development', { pc: 'http://www.dev-PC.com', h5: 'http://www.dev-h5.com' }],
//   ]);
  
// module.exports.api = function(env){
//     const ret = envMap.get(env) ||envMap.get('development');
//     process.env.BASE_URL = ret.pc;
    
//     process.env.VUE_APP_BASE_PC = ret.pc;
//     process.env.VUE_APP_BASE_H5 = ret.h5;
// }

