export default {
  // 默认配置
  default: {
    /* 网页路由 */
    URL: "/", // / /lnt/
    /* 接口ip和端口 */
    API_PREFIX: "http://damonchu.fun/api", // ‘http://127.0.0.1:3001’ 'http://42.192.167.129:3001', // '/ln_api/',
    /* 备案信息 */
    BEI_AN: {
      TEXT: "皖ICP备2021011322号-1",
      URL: "https://beian.miit.gov.cn/",
    },
    /* 文件上传 */
    /* 腾讯云文件 */
    COS_URL: "http://42.192.167.129:3001",
    Image_URL: "https://damonchu-1301459681.cos.ap-chengdu.myqcloud.com/",
    Image_URL_Suffix: "?imageView2/q/70",
    COS_File_Folder: "web_ln/",
    /* 网页端打开文档 */
    OFFICE_URL: "https://view.officeapps.live.com/op/view.aspx?src=",
    /* 本地存储 */
    STORED_USER_KEY: "DCSYSUSERINFO", // 用户信息
    /* 正则验证 */
    PATTEN: {
      /* 所有字符 */
      ALL: /[\u4e00-\u9fa5a-zA-Z0-9\\s|\\S]+/,
      /* 数字和字母 */
      NUMBERANDLETTER: /^[a-zA-Z]\w{5,17}$/,
      /* 手机号 */
      TEL: /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/,
      /* 车牌号 [沪，浙。。。]8位 */
      CARBRAND:
        /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
      /* 证件号码 18位 */
      IDCARD:
        "/([1-6][1-9][50)Id[(4](18|19|20)Id{2]((O[1-9])|10/11/12)(([0-2][1-9])/10)20)/30|/31)d[3][0-9Xx]$/",
      /* 任务单号 LN + 14位 */
      OrderNo: /LN[0-9]{14}$/,
      /* 车架号 17位 */
      Vin: /[0-9]{17}$/,
      /* 商业保单号 22位 */
      CommercialinsurancePolicy: /[0-9]{22}$/,
      /* 交强险保单号 22位 */
      Compulsoryinsurancepolicy: /[0-9]{22}$/,
    },
  },
  // 本地
  local: {},
  // daily
  daily: {},
  // 生产
  prod: {
    baseURL: "api/v1",
  },
};
