<template>
  <transition
    :name="name"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

function hasClass(element, classname) {
  return !!element.className.match(new RegExp('(\\s|^)' + classname + '(\\s|$)'));
}

@Component({
  name: 'TransitionCollapse'
})
export default class extends Vue {
  @Prop({ default: 'vertical' }) direction: 'vertical' | 'horizontal';

  name = '';

  @Watch('direction', {
    immediate: true
  })
  onNameChange(val: string) {
    this.name = `transition-collapse-${val}`;
  }

  beforeEnter(el: any) {
    this.addClass(el, `transition-collapse-${this.direction}`);
    if (!el.dataset) {
      el.dataset = {};
    }

    el.dataset.oldDisplay = el.style.display;
    if (this.direction === 'vertical') {
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.style.height = '0';
      el.style.paddingTop = '0';
      el.style.paddingBottom = '0';
    } else {
      el.dataset.oldPaddingLeft = el.style.paddingLeft;
      el.dataset.oldPaddingRight = el.style.paddingRight;
      el.style.width = '0';
      el.style.paddingLeft = '0';
      el.style.paddingRight = '0';
    }
    el.style.display = 'block';
  }

  enter(el: any) {
    el.dataset.oldOverflow = el.style.overflow;

    if (this.direction === 'vertical') {
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
      } else {
        el.style.height = '';
      }
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    } else {
      if (el.scrollWidth !== 0) {
        el.style.width = el.scrollWidth + 'px';
      } else {
        el.style.width = '';
      }
      el.style.paddingLeft = el.dataset.oldPaddingLeft;
      el.style.paddingRight = el.dataset.oldPaddingRight;
    }

    el.style.overflow = 'hidden';
  }

  enterCancelled() {}

  afterEnter(el: any) {
    // for safari: remove class then reset height is necessary
    this.removeClass(el, `transition-collapse-${this.direction}`);
    el.style.overflow = el.dataset.oldOverflow;
    if (this.direction === 'vertical') {
      el.style.height = '';
    } else {
      el.style.width = '';
    }
  }

  beforeLeave(el: any) {
    if (!el.dataset) {
      el.dataset = null;
    }
    el.dataset.oldOverflow = el.style.overflow;

    el.style.overflow = 'hidden';
    if (this.direction === 'vertical') {
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.style.height = el.scrollHeight + 'px';
    } else {
      el.dataset.oldPaddingLeft = el.style.paddingLeft;
      el.dataset.oldPaddingRight = el.style.paddingRight;
      el.style.width = el.scrollWidth + 'px';
    }
  }

  leave(el: any) {
    if (this.direction === 'vertical') {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        this.addClass(el, `transition-collapse-${this.direction}`);
        el.style.height = '0';
        el.style.paddingTop = '0';
        el.style.paddingBottom = '0';
      }
    } else {
      if (el.scrollWidth !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        this.addClass(el, `transition-collapse-${this.direction}`);
        el.style.width = '0';
        el.style.paddingLeft = '0';
        el.style.paddingRight = '0';
      }
    }
  }

  afterLeave(el: any) {
    this.removeClass(el, `transition-collapse-${this.direction}`);

    if (this.direction === 'vertical') {
      el.style.height = '';
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    } else {
      el.style.width = '';
      el.style.paddingLeft = el.dataset.oldPaddingLeft;
      el.style.paddingRight = el.dataset.oldPaddingRight;
    }
    el.style.overflow = el.dataset.oldOverflow;
  }

  leaveCancelled() {}

  addClass(element: any, className: string) {
    if (!hasClass(element, className)) {
      element.className += ' ' + className;
    }
  }

  removeClass(element: any, className: string) {
    if (hasClass(element, className)) {
      element.className = element.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
    }
  }
}
</script>

<style lang="scss" scoped>
.transition-collapse-vertical {
  transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
}

.transition-collapse-horizontal {
  transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out, 0.3s padding-right ease-in-out;
}

.transition-collapse-down-enter-active,
.transition-collapse-down-leave-active,
.transition-collapse-down-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.transition-collapse-down-enter,
.transition-collapse-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.transition-collapse-up-enter-active,
.transition-collapse-up-leave-active,
.transition-collapse-up-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.transition-collapse-up-enter,
.transition-collapse-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.transition-collapse-right-enter-active,
.transition-collapse-right-leave-active,
.transition-collapse-right-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.transition-collapse-right-enter,
.transition-collapse-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.transition-collapse-left-enter-active,
.transition-collapse-left-leave-active,
.transition-collapse-left-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.transition-collapse-left-enter,
.transition-collapse-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
