/**
 * type
 */

import { CommitOptions, DispatchOptions, Module, Payload, Store } from 'vuex';

export interface IVuexStore<
  TState extends { [key in string]: any },
  TRootState extends { [key in string]: any },
  TActions extends IVuexActions<TState, TRootState>,
  TGetters extends IVuexGetters<TState, TRootState>,
  TMutations extends IVuexMutations<TState>
> extends Omit<Module<TState, TRootState>, 'namespaced'> {
  name?: string;
  state: TState;
  actions?: TActions;
  getters?: TGetters;
  mutations?: TMutations;
}

export interface IVuexDispatch<TPayload = any> {
  (type: string, payload?: TPayload, options?: DispatchOptions): Promise<any>;
  <P extends Payload>(payloadWithType: P, options?: DispatchOptions): Promise<any>;
}

export interface IVuexCommit {
  (type: string, payload?: any, options?: CommitOptions): void;
  <P extends Payload>(payloadWithType: P, options?: CommitOptions): void;
}

export interface IVuexActionContext<TState, TRootState> {
  dispatch: IVuexDispatch;
  commit: IVuexCommit;
  state: TState;
  rootState: TRootState;
  getters: any;
  rootGetters: any;
}

// 定义 action 处理函数
export type IVuexActionHandler<TState, TRootState> = (this: Store<TRootState>, injectee: IVuexActionContext<TState, TRootState>, payload?: any) => any;

// 定义 action root 对象
export interface IVuexActionObject<TState, TRootState> {
  root?: boolean;
  handler: IVuexActionHandler<TState, TRootState>;
}

export type IVuexAction<TState, TRootState> = IVuexActionHandler<TState, TRootState> | IVuexActionObject<TState, TRootState>;

export type IVuexGetter<TState, TRootState> = (state: TState, getters: any, rootState: TRootState, rootGetters: any) => any;

export type IVuexMutation<TState> = (state: TState, payload?: any) => any;

// 定义 actions 类型
export type IVuexActions<TState, TRootState> = {
  [key in string]: IVuexAction<TState, TRootState>;
};

// 定义 getters 类型
export type IVuexGetters<TState, TRootState> = {
  [key in string]: IVuexGetter<TState, TRootState>;
};

// 定义 mutations 类型
export type IVuexMutations<TState> = {
  [key in string]: IVuexMutation<TState>;
};

// 定义预加载数据接口
export interface IPrefetch<TState> {
  (state: TState): void;
}
