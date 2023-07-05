import axios from "axios";
import urljoin from "url-join";
import qs from "qs";
import formatMessage from "./formatMessage.js";

export default (baseOptions) => {
  const instance = axios.create({
    timeout: 10000, // 10s 内无响应就请求超时
    paramsSerializer: {
      serialize: function (params) {
        return qs.stringify(params, { arrayFormat: "brackets" });
      },
    },
    ...baseOptions,
  });
  instance.interceptors.request.use(
    (config) => {
      const skipNprogress =
        config.skipNprogress ||
        (() => {
          return false;
        });
      if (!skipNprogress()) {
        // NProgress.start();
      }
      return config;
    },
    (err) => {
      NProgress.done();
      // 这里极少情况会进来，暂时没有找到主动触发的方法，估计只有浏览器不兼容时才会触发
      // https://segmentfault.com/q/1010000020659252
      return Promise.reject(err);
    }
  );
  // 响应拦截器
  instance.interceptors.response.use(
    (res) => {
      const { config, data, status } = res;
      const method = config.method?.toUpperCase() ?? "GET";
      const skipSuccessHandler =
        config.skipSuccessHandler ||
        (() => {
          // 默认只有 GET 请求不显示成功提示
          return method === "GET";
        });
      if (status >= 200 && status < 300 && !skipSuccessHandler()) {
        // const msg = formatMessage(method, status, data.message);
        // message.success(msg);
      }
      return res;
    },
    (err) => {
      const { config, response, message: errMessage } = err;
      const method = config.method?.toUpperCase() ?? "GET";
      const skipErrorHandler =
        config.skipErrorHandler ||
        (() => {
          return false;
        });
      if (!skipErrorHandler()) {
        const msg = formatMessage(
          method,
          response?.status,
          response ? response.data.message : errMessage
        );
        const desc = `${method}: ${urljoin(
          "/",
          config.url.replace(/^(.*\/)/g, "")
        )}`;
        console.error({
          message: msg,
          description: desc,
        });
      }
      return Promise.reject(err);
    }
  );
  return instance;
};
