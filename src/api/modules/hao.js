export default class {
  constructor(instance) {
    this.instance = instance || null;
  }

  /**
   * 获取导航主目录
   * @param payload 数据
   * @returns
   */
  async GetMainMenu(payload) {
    const { data } = await this.instance.post("/hao/get", payload);
    return data;
  }
}
