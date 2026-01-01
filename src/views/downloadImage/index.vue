<template>
    <div>
      <input v-model="url" placeholder="输入网站URL" />
      <input v-model="divClass" placeholder="输入div的class" />
      <button @click="downloadImages">下载图片</button>
      <div v-if="status">{{ status }}</div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import axiosJsonp from 'axios-jsonp';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const url = ref('');
const divClass = ref('');
const status = ref('');

async function downloadImages() {
    status.value = '正在获取网页内容...';

    try {
        // 使用代理服务器获取网页内容
        const response = await axios.get(`http://localhost/everia?url=${encodeURIComponent(url.value)}`);
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data, 'text/html');
        const targetDiv = doc.querySelector(`.${divClass.value}`);

        if (!targetDiv) {
            status.value = '未找到指定的div';
            return;
        }

        const imgElements = targetDiv.querySelectorAll('img');

        if (imgElements.length === 0) {
            status.value = '在指定的div中未找到图片';
            return;
        }

        status.value = `找到 ${imgElements.length} 张图片，正在下载...`;

        const zip = new JSZip();
        const imagePromises = Array.from(imgElements).map(async (img, index) => {
            const imgUrl = img.src;
            const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
            const filename = `image_${index + 1}.jpg`;
            zip.file(filename, imgResponse.data);
        });

        await Promise.all(imagePromises);

        status.value = '正在生成ZIP文件...';
        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'images.zip');

        status.value = '下载完成！';
    } catch (error) {
        status.value = '获取网页内容失败：' + error.message;
    }
}
</script>

<style lang="scss" scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    input, button {
        margin: 10px 0;
        padding: 5px 10px;
    }
}
</style>