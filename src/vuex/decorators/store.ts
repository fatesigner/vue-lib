/**
 * storeg
 */

import { Type } from './utils';
import { MakeDecorator } from './decorator';
import { VuexModuleDecorator, VuexModuleMetadata } from './type';

type FunctionType = (...args: any[]) => any;

function storeDecoratorFactory(opts?: VuexModuleMetadata) {
  return function (target: FunctionType) {
    opts = Object.assign(
      {},
      {
        name: (target as any)._componentTag || (target as any).name
      },
      opts
    );
    console.log(opts);
    target.prototype.age = 'fasdsad';
    return target;
  };
}

export function Store(opts: VuexModuleMetadata): ClassDecorator;
export function Store<C>(target: C): C;
export function Store(opts?: VuexModuleMetadata | FunctionType) {
  if (Object.prototype.toString.call(opts) === '[object Function]') {
    return storeDecoratorFactory()(opts as FunctionType);
  } else {
    return storeDecoratorFactory(opts);
  }
}

export const VuexModule: VuexModuleDecorator = MakeDecorator(
  'VuexModule',
  (vuexModule: VuexModuleMetadata) => vuexModule,
  undefined,
  undefined,
  (type: Type<any>, meta: VuexModuleMetadata) =>
    function (moduleType: Type<any>, metadata?: VuexModuleMetadata): void {
      const imports: any = (metadata && metadata.imports) || [];
    }
);
