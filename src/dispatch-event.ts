/**
 * dispatch-event
 */

import { VNode } from 'vue/types/vnode';

/**
 * 为指定的 vnode 分发自定义事件
 * @param vnode
 * @param eventName
 * @param data
 * @constructor
 */
export function dispatchEvent(vnode: VNode, eventName: string, data: any) {
  const handlers: any = (vnode.data && vnode.data.on) || (vnode.componentOptions && vnode.componentOptions.listeners);

  if (handlers && handlers[eventName]) {
    handlers[eventName].fns(data);
  }

  /* if (vnode.componentInstance) {
    vnode.componentInstance.$emit(eventName, {
      detail: data
    });
  } else {
    vnode.elm.dispatchEvent(new CustomEvent('onFileChooserChange', {
      detail: data
    }));
  } */
}
