export const PageRegistry: Record<string, new (...args: any[]) => any> = {};

/**
 * Decorator used to register subclasses of BasePage.
 * 
 * @param key Unique name for the page class (e.g., "HomePage")
 */
export function RegisterSubclass(key: string): ClassDecorator {
  return function (target: any) {
    if (PageRegistry[key]) {
      throw new Error(
        `A subclass is already registered under the key "${key}".`
      );
    }
    PageRegistry[key] = target;
  };
}