<script setup>
import { ref } from 'vue'

const hao_data = ref([
  {
    name: '前端论坛',
    hao: [
      { name: '掘金', href: 'https://juejin.cn/', description: '稀土掘金' },
      { name: 'Stackover Flow', href: 'https://stackoverflow.com/', description: '技术问答交流' },
      { name: 'Segmentfault', href: 'https://segmentfault.com/', description: '课程问答设置' },
    ]
  },
  {
    name: '代码hub',
    hao: [
      { name: 'Github', href: 'https://github.com/damonchugs', description: '国外代码托管平台' },
      { name: 'Github', href: 'https://github.com/damonchugs', description: '国外代码托管平台' },
    ]
  }
])

console.log(hao_data, 'hao_data')
</script>