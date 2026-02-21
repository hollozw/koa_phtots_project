<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import instance from "@/axios";
import Sortable from "sortablejs";

const imaRef = ref(null);
const images = reactive([]);
const fileList = ref([]);
const dirName = ref("");

async function onFileChange(event) {
  const files = Array.from(event.target.files);
  files.forEach((file: any, index) => {
    fileList.value.push(file);
  });
  fileList.value.forEach((file, index) => {
    const url = URL.createObjectURL(file);
    images[index] = {
      imageUrl: url,
      name: file.name,
      id: index + "",
      index,
    };
  });
}

function createFormData(dirName, files) {
  const formData = new FormData();
  formData.append("name", dirName);
  files.forEach((file) => {
    formData.append("images", file);
  });
  return formData;
}

async function upload() {
  if (fileList.value.length === 0 || !dirName.value || dirName.value.trim() === "") {
    return;
  }
	const dirNameValue = dirName.value.trim();
  const newFileList = fileList.value.map((file, index) => {
    let extension = file.name.split(".").pop(); // 获取文件扩展名
    return new File(
      [file], // 内容保持不变
      `${reNameByIndex(index)}.${extension}`, // ← 新文件名
      { type: file.type }, // 保持 MIME 类型
    );
  });
  const formData = createFormData(dirNameValue, newFileList);
  const res = await instance.post("/api/file/addFiles", formData);
}

function reNameByIndex(index: number) {
  let str = "" + index;
  while (str.length < 5) {
    str = "0" + str;
  }
  return str;
}

onMounted(() => {
  if (imaRef.value) {
    new Sortable(imaRef.value, {
      animation: 150,
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;
        const movedFile = fileList.value.splice(oldIndex, 1)[0];
        fileList.value.splice(newIndex, 0, movedFile);
      },
    });
  }
});
</script>

<template>
  <div class="file-add scroll-clear">
    <input
      type="file"
      id="fileInput"
      style="display: none"
      multiple
      @change="onFileChange"
    />
    <div class="file-img" ref="imaRef">
      <img v-for="item in images" class="images" :src="item.imageUrl" />
    </div>
		<input class="file-input" type="text" v-model="dirName" placeholder="请输入文件夹名称" />
    <label draggable="false" class="file-img-add" for="fileInput">添加</label>
    <div class="file-submit" @click="upload">提交</div>
  </div>
</template>

<style scoped lang="scss">
.scroll-clear {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    display: none; /* WebKit */
  }
}

.file-add {
  width: 100%;
  height: calc(100vh - 60px);
  overflow: auto;
  position: relative;

  .file-img {
    width: 100%;
    top: 0;
    position: absolute;
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    .images {
      max-width: 250px;
      margin: auto;
      box-sizing: border-box;
      padding: 5px;
      cursor: pointer;
    }
  }
}

.file-img-add {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 10px;
  position: fixed;
  bottom: 20px;
  cursor: pointer;
  background-color: #3c89e8;
  color: #fff;
  right: 150px;
  &:hover {
    background-color: #2a6bbd;
  }
  &:active {
    background-color: #1a4f7a;
  }
}

.file-input {
	width: 200px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	border-radius: 10px;
	position: fixed;
	bottom: 20px;
	left: 20px;
	border: 1px solid #ccc;
	&:focus {
		outline: none;
		border-color: #3c89e8;
	}
}
.file-submit {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 10px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  background-color: #3c89e8;
  color: #fff;
  &:hover {
    background-color: #2a6bbd;
  }
  &:active {
    background-color: #1a4f7a;
  }
}
</style>
