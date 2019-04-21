// Type definitions for @agoric/harden 0.0.4
// Project: Agoric, Inc.
// Definitions by: Michael FIG <michael+jessica@fig.org>

export = harden;

declare function harden<T>(root: T): harden.Hardened<T>;

declare namespace harden {
  type Primitive = undefined | null | boolean | string | number;

  export type Hardened<T> =
    T extends Function ? HardenedFunction<T> :
    T extends Primitive ? Readonly<T> :
    T extends Array<infer U> ? HardenedArray<U> :
    // The following are always hardened, as described in lib.jessie.d.ts
    T extends Map<infer K, infer V> ? Map<K, V> :
    T extends WeakMap<infer WK, infer WV> ? WeakMap<WK, WV> :
    T extends Set<infer M> ? Set<M> :
    T extends WeakSet<infer WM> ? WeakSet<WM> :
    T extends Promise<infer R> ? Promise<R> :
    // All others are manually hardened.
      HardenedObject<T>;

  type HardenedFunction<T> = T; // FIXME: Escape hatch.
  interface HardenedArray<T> extends Readonly<Array<Hardened<T>>> {}
  type HardenedObject<T> = {
    readonly [K in keyof T]: Hardened<T[K]>
  };
}
