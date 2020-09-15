/**
 * vuex-storeg
 */

import { ConvertArrToEnum } from '@fatesigner/utils';

import { IVuexActions, IVuexGetters, IVuexMutations, IVuexStore } from './type';

export function CreateVuexStore<
  TState extends { [key in string]: any },
  TRootState extends { [key in string]: any },
  TActions extends IVuexActions<TState, TRootState>,
  TGetters extends IVuexGetters<TState, TRootState>,
  TMutations extends IVuexMutations<TState>
>(
  store: IVuexStore<TState, TRootState, TActions, TGetters, TMutations>
): {
  store: IVuexStore<TState, TRootState, TActions, TGetters, TMutations>;
  name: string;
  actionKeys: Record<keyof TActions, string>;
  getterKeys: Record<keyof TGetters, string>;
  mutationKeys: Record<keyof TMutations, string>;
} {
  const res: {
    store: IVuexStore<TState, TRootState, TActions, TGetters, TMutations>;
    name: string;
    actionKeys: Record<keyof TActions, string>;
    getterKeys: Record<keyof TGetters, string>;
    mutationKeys: Record<keyof TMutations, string>;
  } = {
    store,
    name: '',
    actionKeys: null,
    getterKeys: null,
    mutationKeys: null
  };

  // 在设置了 namespaced 的情况下，需要为 action 和 getter 的 key 添加 指定的 name 前缀
  let name = '';
  if (store.name) {
    name = store.name + '/';
    res.name = store.name;
    (res.store as any).namespaced = true;
  }

  if (store.actions) {
    res.actionKeys = ConvertArrToEnum(Object.keys(store.actions), (key: any) => `${name}${key}`) as any;
  }

  if (store.getters) {
    res.getterKeys = ConvertArrToEnum(Object.keys(store.getters), (key: any) => `${name}${key}`) as any;
  }

  if (store.mutations) {
    res.mutationKeys = ConvertArrToEnum(Object.keys(store.mutations), (key: any) => `${name}${key}`) as any;
  }

  return res;
}
