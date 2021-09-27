/**
 * scrollAlive
 * 保存滚动条位置
 */

import { VueConstructor } from 'vue';

export function scrollAlive(vue: VueConstructor): void {
  vue.mixin({
    data() {
      return {
        scrollEls: []
      };
    },

    mounted() {
      if (this.$el && this.$el.querySelectorAll) {
        this.scrollEls = [].slice.call(this.$el.querySelectorAll('.page-content'), 0);
      }
    },

    activated() {
      if (this.$el && this.$el.querySelectorAll) {
        this.scrollEls.map((e: any) => {
          e.OBS = function (e2: any) {
            e2.target.SCROLL = e2.target.scrollTop;
          };
          addEventListener('scroll', e, e.OBS);
          /* e['OBS'] = fromEvent(e, 'scroll').subscribe((e2: any) => {
            e2.target['SCROLL'] = e2.target.scrollTop;
          }); */
          if (e.SCROLL) {
            e.scrollTo(0, e.SCROLL);
            e.SCROLL = 0;
          }
        });
      }
    },

    deactivated() {
      if (this.$el && this.$el.querySelectorAll) {
        this.scrollEls.map((e: any) => {
          if (e.OBS) {
            // e['OBS'].unsubscribe();
            removeEventListener('scroll', e, e.OBS);
          }
        });
      }
    }
  });
}
