/**
 * Implementation of Queue
 */
export class Queue<T> {
  _store: T[] = [];
  _order: number = 0;
  /**
   * add item to end of array.
   * @param {T} val
   */
  push(val: T) {
    this._store.push(val);
    this._order++;
  }
  /**
   * delete last item from array and return the array.
   * @return {T | undefined}
   */
  pop(): T | undefined {
    return this._store.pop();
  }
}

