<template>
  <div class="search-box-container">
    <div class="search-url">
      <span
        v-for="(t, index) in UrlList"
        :key="`url-list-${index}`"
        :class="`${FormValue.url === t.name ? 'selected' : 'no-select'}`"
        @click="FormValue.url = t.name">{{ t.name }}</span>
    </div>
    <a-input v-model:value="FormValue.word">
      <!-- <template #addonBefore>
        <a-select :value="FormValue.url" style="width: 90px" @change="UrlChange">
          <Option
            v-for="(t, index) in UrlList"
            :key="`url-list-${index}`"
            :value="t.name" :label="t.name"></Option>
        </a-select>
      </template> -->
      <template size="larger" #addonAfter>
        <AButton type="primary" @click="SearchOpen">搜索</AButton>
      </template>
    </a-input>
  </div>
</template>

<script>

</script>

<script>
import { ref } from 'vue';

import AInput from 'ant-design-vue/lib/input'
import ASelect from 'ant-design-vue/lib/select'
import AButton from 'ant-design-vue/lib/button'

const Option = ASelect.Option;

export default {
  name: 'SearchBox',
  components: { AInput, ASelect, AButton, Option },
  setup() {
    const FormValue = ref({
      word: '',
      url: '百度',
    })

    /* 搜索引擎列表 */
    const UrlList = ref([
      {
        name: '百度',
        url: 'https://www.baidu.com/s?ie=utf-8&wd=',
      },
      {
        name: '必应',
        url: 'https://cn.bing.com/search?q=',
      },
      {
        name: '谷歌',
        url: 'https://www.google.com/search?q=',
      },
      {
        name: 'Yandex',
        url: 'https://yandex.com/search/?clid=2324058&text=',
      }
    ])

    /* 切换搜索引擎 */
    const UrlChange = (val) => {
      FormValue.value.url = val.toString();
      console.log(FormValue.value, 'asd');
    }

    /* 跳转搜索 */
    const SearchOpen = async () => {
      const { word, url } = FormValue.value;

      const PBH = await PanBaiduHref(word, url);
      if (PBH) {
        window.open(PBH);
        return false;
      }

      if (CheckVerify({ word, url })) {
        const urls = UrlList.value.find(t => t.name === url).url
        window.open(`${urls}${word}`)
      };
    }

    /* 百度链接验证 */
    const PanBaiduHref = async (word, url) => {
      if (url === '百度') {
        const regex = /s\/\*|提取码/;
        if (regex.test(word)) {
          const regex_s = /s\/([\w\d\s\S]+?)(\s*提取码|$)/;
          const regex_t = /提取码.*?([a-zA-Z0-9]{4})/;

          // 去除汉字和空格，截取前23个字符
          const filteredString = word.match(regex_s)[1].replace(/[\u4e00-\u9fa5\s]/g, '').substring(0, 23);
          return `https://pan.baidu.com/s/${filteredString}?pwd=${word.match(regex_t)[1]}`;
        }
      }
      return false;
    }

    /* 非空验证 */
    const CheckVerify = async (form) => {
      for (let key in form) {
        if (form[key].length === 0) return false
      }
      return true
    }

    return {
      FormValue,
      UrlList,
      UrlChange,
      SearchOpen,
      CheckVerify,
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box-container {
  padding: $fontSize-20;
  border-radius: 5px;
  
  .search-url {
    display: flex;
    margin-bottom: 5px;
    span {
      color: $fontColor-3;
      margin-right: 8px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }

      &.selected {
        color: $fontColor-4;
      }
    }
  }
}
</style>

<style lang="scss">
.search-box-container {
  .ant-input-group-addon:last-child {
    padding: 0px;
  }
}
</style>