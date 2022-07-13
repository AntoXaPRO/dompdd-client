import { TdRHandlerOptions, TFindFilter } from '..'

import type Api from '../../api'
import type Notification from '../../notification'
import _BaseModule from '../base-module'

import { TUnit, TOffice, TOfficeFilter } from './entities'
export * from './entities'

/**
 * Модуль организаций.
 */
export default class OrgModule extends _BaseModule {
  constructor(api: Api, notification: Notification) {
    super(api, notification)
  }

  /**
   * Найти по ИД.
   */
  async findUnits(orgId: string, opt?: TdRHandlerOptions) {
    const url = 'units?orgId=' + orgId
    const dR = await this._api.get<TUnit[]>(url)
    return this.dRHandler(dR, opt)
  }

  /**
   * Выборка офисов обучения.
   */
  async findOffice(filter?: TFindFilter<TOfficeFilter>, opt?: TdRHandlerOptions) {
    const url = this.getUrl('offices', filter)
    const dR = await this._api.get<TOffice[]>(url)
    return this.dRHandler(dR, opt)
  }
}
