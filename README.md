# vue-lib

[![build][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@fatesigner/vue-lib.svg?color=green&style=flat-square
[npm-url]: https://npmjs.com/package/@fatesigner/vue-lib
[travis-image]: https://travis-ci.com/fatesigner/vue-lib.svg?branch=master&color=success&style=flat-square
[travis-url]: https://travis-ci.com/fatesigner/vue-lib
[download-image]: https://img.shields.io/npm/dw/@fatesigner/vue-lib.svg?style=flat-square
[download-url]: https://npmjs.com/package/@fatesigner/vue-lib

Vue组件库.

## 安装

```bash
# 预先安装 vue
npm i -S vue vue-property-decorator
npm i -S @fatesigner/vue-lib
```

## 使用
### 用于动态组件的自定义事件分发
```html
<component :is="comp" v-dynamic-events="{ events: events, listener: listener }" />
```

```ts
import Vue from 'vue';
import { DynamicEvents } from '@fatesigner/vue-lib/directives';

Vue.use(DynamicEvents);

export default {
  data() {
    return {
      comp: import('./component/Comp.vue'),
      // 监听指定事件
      events: ['changed', 'done']
    }
  },
  methods: {
    // 监听动态组件发出的事件
    listener(eventName: string, ...args: any[]) {
      console.log(`${eventName} was triggered.`, args);
    }
  }
};
```

