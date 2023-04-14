// 使用 Mock
import Mock from "mockjs";
// 获取文件
const mocks = [];

const modulesFiles = require.context("./data", false, /\.js$/);
modulesFiles.keys().reduce((modules, modulePath) => {
  // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath);
  // modules[moduleName] = value.default
  mocks.push(value.default[0]);
  return modules;
}, {});

mocks.reverse();

// Mock.mock('/api/web', 'post', web);

// for mock server
const responseFake = (url, type, respond) => {
  Mock.mock(`/mock${url}`, type, respond);
};

// for (let key in mocks) {
//   mocks[key].tab.map(route => {
//     return responseFake(route.url, route.type, route.response)
//   })
// }

// Mock.mock(`/mock/menu`, 'get', mocks)

export { mocks };

export default mocks.map((route) => {
  return responseFake(route.url, route.type, route.response);
});

// responseFake('/web')

// var data = Mock.mock({
//     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
//     'list|1-10': [{
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1
//     }]
// })
// // 输出结果
// console.log(JSON.stringify(data, null, 4))
