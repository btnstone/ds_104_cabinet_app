<script setup lang="ts" generic="T">
import type { StepItem } from './types';
import { buildShortUUID } from '@/utils/uuid';

defineOptions({ name: 'StepPage', inheritAttrs: false });

const props = defineProps({
  current: {
    type: Number,
    default: 1,
  },
  data: Object,
  stepItems: {
    type: Array<StepItem>,
    default: [],
  },
});

// ok--完成事件，error--异常事件
const emits = defineEmits(['ok', 'error', 'update:current']);

const stepItems = computed(() => props.stepItems.map(v => ({ key: buildShortUUID('step-item'), title: v.title })));
const vData = useVModel(props, 'data', emits);
const vCurrent = useVModel(props, 'current', emits);

const componentMaps = computed(() => {
  return new Map(props.stepItems.map((v, i) => ([i + 1, v.component])));
});

const componentParams = computed(() => {
  return new Map(props.stepItems.map((v, i) => ([i + 1, v.params])));
});

const paramAttributes = computed(() => {
  const params = componentParams.value.get(vCurrent.value);
  return { ...params };
});

// 上一步
function handlePrev() {
  if (vCurrent.value <= 1) {
    return;
  }
  vCurrent.value -= 1;
}

// 下一步
function handleNext() {
  if (vCurrent.value === unref(stepItems).length) {
    return;
  }
  if (++vCurrent.value === unref(stepItems).length) {
    emits('ok');
  }
}

function handleError(...args: any) {
  emits('error', unref(vCurrent), ...args);
}
</script>

<template>
  <div class="wh-full flex flex-col items-center justify-center">
    <!--  -->
    <div class="w-90% flex">
      <div
        v-for="(step, index) in stepItems" :key="step.key" class="flex flex-col"
        :class="[index > 0 ? 'flex-1' : '']"
      >
        <template v-if="index > 0">
          <div class="flex">
            <div class="flex flex-1 items-center justify-center">
              <div class="mx-[-15px] h-1 flex-1" :class="[index + 1 <= vCurrent ? 'bg-blue' : ' bg-line']" />
            </div>
            <div class="w-100 flex items-center justify-center">
              <div class="h-30 w-30 border-rd-full" :class="[index + 1 <= vCurrent ? 'bg-blue' : ' radius-color']" />
            </div>
          </div>
          <div class="flex">
            <div class="flex-1" />
            <div
              class="mt-4 w-100 flex-shrink-0 text-center text-16"
              :class="[index + 1 <= vCurrent ? 'text-blue' : ' text-color']"
            >
              {{ step.title }}
            </div>
          </div>
        </template>
        <template v-else>
          <div class="w-100 flex items-center justify-center">
            <div
              class="h-30 w-30 border-rd-full bg-blue"
              :class="[index + 1 <= vCurrent ? 'bg-blue' : ' radius-color']"
            />
          </div>
          <div class="mt-4 text-center text-16" :class="[index + 1 <= vCurrent ? 'text-blue' : ' text-color']">
            {{ step.title }}
          </div>
        </template>
      </div>
    </div>
    <!--  -->
    <div class="component-container">
      <component :is="componentMaps.get(current)" v-model="vData" v-bind="paramAttributes" @next="handleNext" @prev="handlePrev" @error="handleError" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg-blue {
  background-color: #429fff;
}

.bg-line {
  background-color: #b7babc;
}

.text-color {
  color: #aaacb3;
}

.radius-color {
  background-color: #edeced;
}

.component-container {
  width: calc(100vw - 80px);
  flex: 1 1 0%;
}
</style>
