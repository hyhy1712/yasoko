import {Modal} from 'ant-design-vue';

export function modalConfirm(title, content, onOk, width = 400) {
    Modal.confirm({
        title: title,
        content: content,
        onOk() {
            return onOk();
        },
        width: width
    });
}
