/**
 * type
 */

import { Type } from './utils';
import { VuexStore } from './vuex-store';

export interface VuexModuleMetadata {
  name: string;
  imports?: { [key: string]: typeof VuexStore };
}

export interface TypeDecorator {
  <T extends Type<any>>(type: T): T;
  (target: Record<string, any>, propertyKey?: string | symbol, parameterIndex?: number): void;
}

export interface VuexModuleDecorator {
  (obj?: VuexModuleMetadata): TypeDecorator;
  new (obj?: VuexModuleMetadata): VuexModuleMetadata;
}
