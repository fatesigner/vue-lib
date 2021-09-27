/**
 * cleanKeepAliveCache
 * 使用 Vue.mixin 拦截路由离开事件，并在该拦截方法中实现销毁页面缓存的功能。
 */

import { VueConstructor } from 'vue';

export function cleanKeepAliveCache(vue: VueConstructor): void {
  vue.mixin({
    beforeRouteLeave(to: any, from: any, next: any) {
      if (from && from.meta.rank && to.meta.rank && from.meta.rank > to.meta.rank) {
        // 此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
        if (this.$vnode && this.$vnode.data.keepAlive) {
          if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
            if (this.$vnode.componentOptions) {
              const key =
                this.$vnode.key == null
                  ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
                  : this.$vnode.key;
              const cache = this.$vnode.parent.componentInstance.cache;
              const keys = this.$vnode.parent.componentInstance.keys;
              if (cache[key]) {
                if (keys.length) {
                  const index = keys.indexOf(key);
                  if (index > -1) {
                    keys.splice(index, 1);
                  }
                }
                delete cache[key];
              }
            }
          }
        }
        this.$destroy();
      }
      next();
    }
  } as any);
}
