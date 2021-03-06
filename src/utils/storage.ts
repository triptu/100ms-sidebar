
export class LocalStorage<T> {
  private storage: Storage | null = null;

  constructor(public readonly key: string) {}

  /**
   * localstorage is not available in SSR, so get it only at time of use
   */
  getStorage() {
    if (!this.storage) {
      this.storage = window.localStorage;
    }
    return this.storage;
  }

  get(): T | undefined {
    const stringItem = this.getStorage()?.getItem(this.key);
    if (!stringItem) {
      return;
    }
    return JSON.parse(stringItem) as T;
  }

  set(value: T) {
    const stringValue = JSON.stringify(value);
    this.getStorage()?.setItem(this.key, stringValue);
  }

  clear() {
    this.getStorage()?.removeItem(this.key);
  }
}