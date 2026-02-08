<script setup>
import instance from './axios';
import { TaskQueue } from '@/utils/task'
import { onMounted, ref } from 'vue'

const taskQueue = new TaskQueue(5);
const fileList = ref([]);
let images = [];

onMounted(() => {
  window.addEventListener('online', () => isOnline.value = true)
  window.addEventListener('offline', () => isOnline.value = false)
})

async function fn(event) {
  fileList.value = Array.from(event.target.files);
}

function createFormData(dirName, files) {
  const formData = new FormData();
  formData.append('name', dirName);
  files.forEach(file => {
    formData.append('images', file);
  });
  console.log(formData, 'formData');
  return formData;
}


async function submit() {
  const formData = createFormData('新文件夹', fileList.value);

  const res = await instance.post('/api/file/addFiles', formData)
  console.log(res, 'res');
}

</script>

<template>
  <header>
    <input @change="fn" style="width: 0;height: 0;" type="file" id="fileInput" multiple accept="image/*">
    <label for="fileInput" style="display: block; width: 100%; height: 100px;cursor: pointer;">upload</label>
    <div style="width: 100%; height: 100px;cursor: pointer;" @click="submit">submit</div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
