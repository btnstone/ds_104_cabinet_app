<script setup lang="ts">
import type { InputInst, InputProps } from 'naive-ui';
import { NInput, NPopover } from 'naive-ui';
import Keyboard from 'simple-keyboard';
import type { PropType } from 'vue';
import { computed, nextTick, ref, unref, watch } from 'vue';
import 'simple-keyboard/build/css/index.css';
import { useVModel } from '@vueuse/core';
import layout from 'simple-keyboard-layouts/build/layouts/chinese.js';
import { buildShortUUID } from '@/utils/uuid';

defineOptions({ name: 'PopoverInput', inheritAttrs: false });

const props = defineProps({
  type: { type: String as PropType<'text' | 'password'>, default: 'text' },
  value: { type: String, default: '' },
  placeholder: { type: String },
  layoutName: {
    type: String as PropType<'default' | 'shift' | 'simple-number' | 'simple'>,
    default: 'default',
  },
  inputProps: { type: Object as PropType<InputProps> },
});

const emits = defineEmits(['update:value', 'enter', 'close']);

type KeyboardInstance = InstanceType<typeof Keyboard>;

const keyboardClass = buildShortUUID('popover-input-keyboard');
const inputRef = ref<InputInst>();
const modelValue = useVModel(props, 'value', emits);

const getWidth = computed(() => {
  if (props.layoutName === 'simple-number') {
    return 300;
  }
  return 1000;
});
const keyboard = ref<Nullable<KeyboardInstance>>(null);
const displayDefault = ref({
  '{bksp}': 'backspace',
  '{lock}': 'caps',
  '{enter}': 'enter',
  '{tab}': 'tab',
  '{shift}': 'shift',
  '{change}': 'en',
  '{space}': 'space',
  '{clear}': '清空',
  '{close}': '关闭',
  '{arrowleft}': '←',
  '{arrowright}': '→',
  '{A/a}': 'A/a',
});

async function handleUpdateShow(show: boolean) {
  if (show) {
    await nextTick();
    // const prevKeyboard = document.querySelectorAll('.init-keyboard');
    // if (prevKeyboard.length > 0)
    //   prevKeyboard[0]?.remove();
    keyboard.value = new Keyboard(`${keyboardClass}`, {
      onChange,
      onKeyPress,
      onInit,
      layout: {
        // 默认布局
        'default': [
          '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
          '{tab} q w e r t y u i o p [ ] \\',
          '{lock} a s d f g h j k l ; \' {enter}',
          '{shift} z x c v b n m , . / {clear}',
          '{change} {space}',
        ],
        // 大小写
        'default-shift': [
          '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
          '{tab} Q W E R T Y U I O P { } |',
          '{lock} A S D F G H J K L : " {enter}',
          '{shift} Z X C V B N M < > ? {clear}',
          '{change} {space}',
        ],
        'simple-number': ['7 8 9', '4 5 6', '1 2 3', '0 {clear} {bksp}'],
        // 数字布局
        'number': ['7 8 9', '4 5 6', '1 2 3', '. 0 {bksp}', '{clear}'],
        'simple': [
          '1 2 3 4 5 6 7 8 9 0',
          'q w e r t y u i o p',
          'a s d f g h j k l {A/a}',
          'z x c v b n m {bksp}',
        ],
        'simple-shift': [
          '1 2 3 4 5 6 7 8 9 0',
          'Q W E R T Y U I O P',
          'A S D F G H J K L {A/a}',
          'Z X C V B N M {bksp}',
        ],
      },
      layoutName: props.layoutName,
      display: unref(displayDefault),
      theme: 'hg-theme-default init-keyboard',
    });
  }
  else {
    unref(keyboard)?.destroy();
  }
}

function onChange(input: string) {
  modelValue.value = input;
}
function onKeyPress(button: string) {
  if (button === '{lock}' || button === '{A/a}' || button === '{shift}')
    return handleLock();
  if (button === '{change}')
    return handleChange();
  if (button === '{clear}')
    return handleClear();
  if (button === '{enter}')
    return handleEnter();
  if (button === '{close}')
    return handleClose();
}
function onInit(keyboard: KeyboardInstance) {
  keyboard.setInput(unref(modelValue));
}

function handleLock() {
  const currentLayout = unref(keyboard)?.options?.layoutName as string;
  unref(keyboard)?.setOptions({
    layoutName: /-shift/.test(currentLayout) ? currentLayout.replace(/-shift/, '') : `${currentLayout}-shift`,
  });
}
function handleChange() {
  const layoutCandidates = unref(keyboard)?.options.layoutCandidates;
  // 切换中英文输入法
  if (layoutCandidates != null && layoutCandidates !== undefined) {
    displayDefault.value['{change}'] = 'en';
    unref(keyboard)?.setOptions({
      layoutName: 'default',
      layoutCandidates: null,
      display: displayDefault.value,
    });
  }
  else {
    displayDefault.value['{change}'] = 'cn';
    unref(keyboard)?.setOptions({
      layoutName: 'default',
      layoutCandidates: (layout as any).layoutCandidates,
      display: displayDefault.value,
    });
  }
}
function handleClear() {
  unref(keyboard)?.clearInput();
  modelValue.value = '';
}
function handleEnter() {
  emits('enter');
}
function handleClose() {
  emits('close');
}

watch(modelValue, () => {
  unref(keyboard)?.setInput(unref(modelValue));
});
</script>

<template>
  <NPopover placement="bottom-end" trigger="focus" :show-arrow="false" :raw="true" :width="getWidth" @mousedown.prevent @update:show="handleUpdateShow">
    <template #trigger>
      <NInput ref="inputRef" v-model:value="modelValue" :type="type" :placeholder="placeholder" spellcheck="false" />
    </template>
    <div :class="keyboardClass" />
  </NPopover>
</template>

<style>
.hg-theme-default .hg-button {
  font-size: 24px;
  height: 50px;
}

.hg-theme-default .hg-button.hg-button-change {
  max-width: 80px;
}
</style>
