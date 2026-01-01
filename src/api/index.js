import AppConfig from "@/config.js";
import createAxiosInstance from "@/utils/createAxiosInstance.js";

const instance = createAxiosInstance({
  baseURL: AppConfig.default.API_PREFIX,
});

/* 检测文件夹下文件 */
const modulesFiles = require.context("./modules", false, /\.js$/);

// eslint-disable-next-line @typescript-eslint/no-shadow
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const NewModules = (items) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const modules = {};
  for (const keys in items) {
    if (items[keys]) modules[keys] = new items[keys](instance);
  }
  return modules;
};

export default {
  ...NewModules(modules),
};
