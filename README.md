# vue-lib

[![npm][npm-image]][npm-url]
[![download][download-image]][download-url]
[![commitizen][commitizen-image]][commitizen-url]
[![prettier][prettier-image]][prettier-url]
[![semantic][semantic-image]][semantic-url]

[npm-image]: https://img.shields.io/npm/v/@fatesigner/vue-lib.svg?style=flat-square&logo=npm
[npm-url]: https://npmjs.com/package/@fatesigner/vue-lib
[prettier-image]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square&logo=prettier
[prettier-url]: https://github.com/prettier/prettier
[download-image]: https://img.shields.io/npm/dw/@fatesigner/vue-lib.svg?style=flat-square
[download-url]: https://npmjs.com/package/@fatesigner/vue-lib
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-green.svg?style=flat-square
[commitizen-url]: http://commitizen.github.io/cz-cli/
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square&color=9cf
[semantic-url]: https://opensource.org/licenses/MIT

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

