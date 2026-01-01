import Hao from "@/assets/database/hao.json";
import Menu from "@/assets/database/menu.json";

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

  /**
   * 获取导航主目录
   * @param payload 数据
   * @returns
   */
  async GetMainMenuJson({ type }) {
    // const { data } = await this.instance.post("/hao/getJson", payload);
    let data = type === "MenuList" ? Menu.RECORDS : Hao.RECORDS;
    // console.log(data, type)
    data.map((t) => {
      t.parent_id = t.parent_id === null ? null : Number(t.parent_id);
    });
    return { data };
  }
}
