import { defineComponent } from 'vue';
import { NButton, NDialogProvider, useDialog } from 'naive-ui';

export default defineComponent({
  name: 'CommonDialog',
  props: {
    content: String,
    onConfirm: Function as () => void,
  },
  setup(props) {
    const dialog = useDialog();

    const openDialog = () => {
      dialog.warning({
        title: '固定标题',
        content: props.content,
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          if (props.onConfirm) {
            // props.onConfirm();
          }
        },
      });
    };

    return () => (
      <NDialogProvider>
        <NButton onClick={openDialog}>打开对话框</NButton>
      </NDialogProvider>
    );
  },
});
