<script setup lang="ts">
defineOptions({ name: 'Inventory' });

const props = defineProps({
  title: {
    type: String,
  },
});

const emits = defineEmits(['next', 'prev', 'error']);
const model = defineModel({ default: { foo2: 0 } });

function handleNext() {
  model.value.foo2 = Math.random();
  emits('next', 'haha');
}

onMounted(() => {
  console.log(props);
  checkDate();
//   props.title = 'asdasdasd';
});

function checkDate() {
  handleNext();
  // todo 数据校验
  // if (showModalType.value === 1) {

  // }
  // else {

  // }
}
</script>

<template>
  <div class="mt-20 h-full w-full flex flex-col items-center justify-center">
    <div class="text-26 font-bold line-height-none">
      <!-- {{ title }} -->
      112312313的撒
    </div>
    <n-list clickable bordered class="w-full" style="max-height: 400px;overflow-y: hidden; overflow-y: auto;">
      <n-list-item>
        <div>
          他在时间门外
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
      <n-list-item>
        <div>
          最新的打印机
        </div>
      </n-list-item>
    </n-list>
    <div>
      <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;margin-right:50px;" color="#ededf1" text-color="#000">
        核对不一致
      </n-button>
      <n-button size="large" type="info" round style="--n-font-size: 26px;--n-height: 60px;--n-icon-size: 28px;width:300px;">
        核对一致
      </n-button>
    </div>
  </div>
</template>

<style setup lang="scss">
.item-container {
  width: 250px;
  height: 300px;
  border: 3px solid #d0e0f0;
  border-radius: 30px;
}

.item-container:active {
  transform: scale(0.98);
}

.modal-container {
  width: 500px;
  background-color: #fff;
  border-radius: 30px;

  overflow-y: hidden;
}
</style>
