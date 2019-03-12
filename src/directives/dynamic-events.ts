/**
 * dynamic-events
 * 用于 component 的自定义事件分发
 */

import { VNode, VueConstructor } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

export function DynamicEvents(vue: VueConstructor): void {
  vue.directive('dynamicEvents', {
    bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
      const { events, listener } = binding.value;
      events.forEach((event: any) => {
        // register handler in the dynamic component
        if (listener) {
          vnode.componentInstance.$on(event, (...args: any[]) => {
            // vnode.context.$emit(event, eventData);
            if (listener) {
              listener(event, ...args);
            }
          });
        }
      });
    },
    unbind(el, binding, vnode) {
      vnode.componentInstance.$off();
    }
  });
}
