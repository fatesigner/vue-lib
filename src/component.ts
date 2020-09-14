/**
 * define vue component operation type
 */

import { Vue } from 'vue/types/vue';

export type IVueCompContext = Vue;

export type IVueCompGetContext<T extends IVueCompContext> = () => T;

// 定义组件向外部暴露的可访问的对象，用于操作组件
export type IVueCompHandler = Record<string, (...args: any[]) => Promise<any>>;

export type IVueCompProps = Record<string, any>;

export type IVueCompMethods<TContext extends IVueCompContext> = Record<string, (this: TContext, ...args: any[]) => any>;

export type IVueCompListeners<TContext extends IVueCompContext> = Record<
  string,
  (this: TContext, ...args: any[]) => any
>;

export interface IVueCompOptions<
  TGetContext extends IVueCompGetContext<IVueCompContext> = IVueCompGetContext<IVueCompContext>,
  TProps extends IVueCompProps = IVueCompProps,
  TListeners extends IVueCompListeners<ReturnType<TGetContext>> = IVueCompListeners<ReturnType<TGetContext>>,
  TMethods extends IVueCompMethods<ReturnType<TGetContext>> = IVueCompProps
> {
  getContext: TGetContext;
  props?: TProps;
  listeners?: TListeners;
  methods?: TMethods;
}

export type IVueCompInstance<
  THandler extends IVueCompHandler = IVueCompHandler,
  TGetContext extends IVueCompGetContext<IVueCompContext> = IVueCompGetContext<IVueCompContext>,
  TProps extends IVueCompProps = IVueCompProps,
  TListeners extends IVueCompListeners<ReturnType<TGetContext>> = IVueCompProps,
  TMethods extends IVueCompMethods<ReturnType<TGetContext>> = IVueCompProps
> = Omit<IVueCompOptions<TGetContext, TProps, TListeners, TMethods>, 'getContext'> & {
  handler: {
    [key in keyof THandler]: THandler[key];
  };
};
