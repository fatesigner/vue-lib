/**
 * decorator
 */

import { NoSideEffects, Type } from './utils';

export interface TypeDecorator {
  <T extends Type<T>>(type: T): T;
  (target: Record<string, any>, propertyKey?: string | symbol, parameterIndex?: number): void;
}

export const ANNOTATIONS = '__annotations__';
export const PARAMETERS = '__parameters__';
export const PROP_METADATA = '__prop__metadata__';

function MakeMetadataCtor(props?: (...args: any[]) => any): any {
  return function ctor(this: any, ...args: any[]) {
    if (props) {
      const values = props(...args);
      for (const propName in values) {
        this[propName] = values[propName];
      }
    }
  };
}

export function MakePropDecorator(
  name: string,
  props?: (...args: any[]) => any,
  parentClass?: any,
  additionalProcessing?: (target: any, name: string, ...args: any[]) => void
): any {
  return NoSideEffects(() => {
    const metaCtor = MakeMetadataCtor(props);

    function PropDecoratorFactory(this: unknown | typeof PropDecoratorFactory, ...args: any[]): any {
      if (this instanceof PropDecoratorFactory) {
        metaCtor.apply(this, args);
        return this;
      }

      const decoratorInstance = new (PropDecoratorFactory as any)(...args);

      function PropDecorator(target: any, name: string) {
        const constructor = target.constructor;
        // Use of Object.defineProperty is important since it creates non-enumerable property which
        // prevents the property is copied during subclassing.
        const meta = Object.prototype.hasOwnProperty.call(constructor, PROP_METADATA)
          ? (constructor as any)[PROP_METADATA]
          : Object.defineProperty(constructor, PROP_METADATA, { value: {} })[PROP_METADATA];
        meta[name] = (Object.prototype.hasOwnProperty.call(meta, name) && meta[name]) || [];
        meta[name].unshift(decoratorInstance);

        if (additionalProcessing) additionalProcessing(target, name, ...args);
      }

      return PropDecorator;
    }

    if (parentClass) {
      PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }

    PropDecoratorFactory.prototype.ngMetadataName = name;
    (PropDecoratorFactory as any).annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
  });
}

/**
 * @suppress {globalThis}
 */
export function MakeDecorator<T>(
  name: string,
  props?: (...args: any[]) => any,
  parentClass?: any,
  additionalProcessing?: (type: Type<T>) => void,
  typeFn?: (type: Type<T>, ...args: any[]) => void
): { new (...args: any[]): any; (...args: any[]): any; (...args: any[]): (cls: any) => any } {
  return NoSideEffects(() => {
    const metaCtor = MakeMetadataCtor(props);

    function DecoratorFactory(this: unknown | typeof DecoratorFactory, ...args: any[]): (cls: Type<T>) => any {
      if (this instanceof DecoratorFactory) {
        metaCtor.call(this, ...args);
        return this as typeof DecoratorFactory;
      }

      const annotationInstance = new (DecoratorFactory as any)(...args);
      return function TypeDecorator(cls: Type<T>) {
        if (typeFn) {
          typeFn(cls, ...args);
        }
        const annotations = Object.prototype.hasOwnProperty.call(cls, ANNOTATIONS)
          ? (cls as any)[ANNOTATIONS]
          : Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];
        annotations.push(annotationInstance);

        if (additionalProcessing) {
          additionalProcessing(cls);
        }

        return cls;
      };
    }

    if (parentClass) {
      DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }

    DecoratorFactory.prototype.ngMetadataName = name;
    (DecoratorFactory as any).annotationCls = DecoratorFactory;
    return DecoratorFactory as any;
  });
}

export function MakeParamDecorator(name: string, props?: (...args: any[]) => any, parentClass?: any): any {
  return NoSideEffects(() => {
    const metaCtor = MakeMetadataCtor(props);
    function ParamDecoratorFactory(this: unknown | typeof ParamDecoratorFactory, ...args: any[]): any {
      if (this instanceof ParamDecoratorFactory) {
        metaCtor.apply(this, args);
        return this;
      }
      const annotationInstance = new (ParamDecoratorFactory as any)(...args);

      function ParamDecorator(cls: any, unusedKey: any, index: number): any {
        // Use of Object.defineProperty is important since it creates non-enumerable property which
        // prevents the property is copied during subclassing.
        const parameters = Object.prototype.hasOwnProperty.call(cls, PARAMETERS)
          ? (cls as any)[PARAMETERS]
          : Object.defineProperty(cls, PARAMETERS, { value: [] })[PARAMETERS];

        // there might be gaps if some in between parameters do not have annotations.
        // we pad with nulls.
        while (parameters.length <= index) {
          parameters.push(null);
        }

        (parameters[index] = parameters[index] || []).push(annotationInstance);
        return cls;
      }

      (ParamDecorator as any).annotation = annotationInstance;
      return ParamDecorator;
    }
    if (parentClass) {
      ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    ParamDecoratorFactory.prototype.ngMetadataName = name;
    (ParamDecoratorFactory as any).annotationCls = ParamDecoratorFactory;
    return ParamDecoratorFactory;
  });
}
