import { DataResultEntity } from 'axp-ts'

import type Api from '../api'
import type Notification from '../notification'

/**
 * Объект для преобразования фильтра в URL.
 *
 */
export type TFindFilter<T extends object> = {
  obj?: T
  pagination?: {
    page?: number | string
    limit?: number | string
  }
}

/**
 * Параметры обработчика результата возвращаемого сервером.
 */
export type TdRHandlerOptions = {
  notifyError?: boolean
  successMessage?: true | string
}

/**
 * Базовый абстрактный класс модуля.
 */
export default abstract class _BaseModule {
  protected _api: Api
  protected _notification: Notification

  constructor(api: Api, notification: Notification) {
    this._api = api
    this._notification = notification
  }

  /**
   * Преобразовение фильтра в URL.
   */
  getUrl(base: string, filter?: TFindFilter<any>): string {
    let url = base.replace(/[?]$/, '')

    if (filter) {
      url += '?'

      // Фильтр.
      if (filter.obj) {
        for (const key of Object.keys(filter.obj)) {
          url += key + '=' + filter.obj[key] + '&'
        }
      }

      // Пагинация.
      if (filter.pagination) {
        const { page, limit } = filter.pagination
        if (page) url += 'page=' + page + '&'
        if (limit) url += 'limit=' + limit
      }

      url = url.replace(/[&]$/, '').replace(/[?]$/, '')
    }

    return url
  }

  /**
   * Обработчик возвращаемого результата от сервера (сообщения).
   */
  dRHandler<T>(
    dR: DataResultEntity<T>,
    opt: TdRHandlerOptions = {}
  ): DataResultEntity<T> {
    const notifyError = opt.notifyError === undefined ? true : opt.notifyError

    if (dR.errors?.length > 0) {
      if (notifyError) {
        for (const err of dR.errors) {
          this._notification.add({ code: 'error', text: err.text })
        }
      }
    } else {
      if (opt.successMessage) {
        if (typeof opt.successMessage === 'string') {
          this._notification.add({
            code: 'success',
            text: opt.successMessage
          })
        } else {
          this._notification.add({ code: 'success', text: dR.message })
        }
      }
    }

    return dR
  }
}
