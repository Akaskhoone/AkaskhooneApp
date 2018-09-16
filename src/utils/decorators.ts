export function debounce(ms: number = 500): Function {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get(): () => any {
        Object.defineProperty(this, propertyKey, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: debounceHelper(descriptor.value, ms)
        });

        return this[propertyKey];
      }
    };
  };
}

function debounceHelper(func: Function, ms: number): Function {
  let timeoutId: any;

  return function() {
    const args = arguments;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, ms);
  };
}
