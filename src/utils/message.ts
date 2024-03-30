import { h, render } from 'vue'
import Message from '@/components/MessageBox.vue'
type Props = {
    type: "success" | "error" | "warning" | "info";
    message: string;
    duration?: number;
};
const box = window.document.createElement('div')
window.document.body.appendChild(box)
export class MessageBox {
    static _close_timer:any;
    static show(msg: Props) {
        const t = (msg.duration && msg.duration > 0) ? msg.duration : 1500
        const vNode = h(Message, msg);
        render(vNode, box);
        clearTimeout(MessageBox._close_timer);
        MessageBox._close_timer = setTimeout(()=>{
            render(null,box);
        },t)
    }
    static success(message: string) {
        MessageBox.show({ type: 'success', message })
    }
    static error(message: string){
        MessageBox.show({ type: 'error', message })
    }
    static warning(message: string){
        MessageBox.show({ type: 'warning', message })
    }
}