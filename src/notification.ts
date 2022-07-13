import { TNotificationItem } from 'axp-ts'

export default class Notification {
  private _list: TNotificationItem[]

  private _onAdd?: (item: TNotificationItem) => void
  private _onRemove?: (index: number) => void

  constructor() {
    this._list = []
  }

  get list() {
    return this._list || []
  }

  onAdd(cb: (item: TNotificationItem) => void) {
    this._onAdd = cb
  }

  onRemove(cb: (index: number) => void) {
    this._onRemove = cb
  }

  add(item: TNotificationItem) {
    this._list.push(item)
    if(this._onAdd) this._onAdd(item)
  }

  remove(index: number) {
    this._list = this._list.filter(({}, i) => i !== index)
    if(this._onRemove) this._onRemove(index)
  }

  clear() {
    this._list = []
  }
}
