import "axios";

type ES6Promise<T> = Promise<T>;
declare module "axios" {
  interface Promise<V> extends ES6Promise<V> {}
}
