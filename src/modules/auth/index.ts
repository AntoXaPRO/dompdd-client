import { DataResultEntity } from 'axp-ts'

import type Api from '../../api'
import type Notification from '../../notification'
import { TFindFilter, TdRHandlerOptions } from '..'
import _BaseModule from '../base-module'

export * from './entities'
export * as personHelpers from './helpers'

import {
  TAuthObj,
  TAccount,
  TAuthForm,
  AuthFormModel,
  TPerson,
  TFilterPerson,
  TPersonForm,
  PersonFormModel
} from './entities'

/**
 * Модуль авторизации.
 */
export default class Auth extends _BaseModule {
  private _clientName?: string
  private _account?: TAccount

  constructor(api: Api, notification: Notification, clientName?: string) {
    super(api, notification)
    this._clientName = clientName
  }

  /**
   * Аккаунт авторизованного пользователя.
   */
  get account(): TAccount | undefined {
    return this._account
  }

  /**
   * Создание модели формы авторизации.
   */
  createAuthFormModel() {
    return new AuthFormModel({
      client: this._clientName,
      login: '',
      password: ''
    })
  }

  /**
   * Загрузить данные текущего аккаунта.
   */
  async loadAccount(): Promise<TAccount | undefined> {
    const dR = await this._api.get<TAccount>('auth')
    dR.status === 200 ? (this._account = dR.data) : (this._account = undefined)
    return this._account
  }

  /**
   * Авторизация.
   */
  async login(form: TAuthForm, cb?: (dR: DataResultEntity<TAuthObj>) => void) {
    const dR = await this._api.post<TAuthObj>('auth', form)
    if (dR.status === 200) {
      this._account = dR.data.account
      this._api.setToken(dR.data.token)
    }
    if (cb) cb(dR)
    return dR
  }

  /**
   * Разлогинивание.
   */
  async logOut() {
    this._account = undefined
  }

  /**
   * Выборка персональных данных.
   */
  async findPerson(filter?: TFindFilter<TFilterPerson>, opt?: TdRHandlerOptions) {
    const url = this.getUrl('persons', filter)
    const dR = await this._api.get<TPerson[]>(url)
    return this.dRHandler(dR, opt)
  }

  /**
   * Найти перс. данные по ИД.
   */
  async findPersonById(id: string, opt?: TdRHandlerOptions) {
    const url = 'persons/' + id
    const dR = await this._api.get<TPerson>(url)
    return this.dRHandler(dR, opt)
  }

  /**
   * Создание модели формы прес. данных.
   */
  createPersonFormModel(person?: TPerson) {
    return new PersonFormModel(Object.assign({}, person))
  }

  /**
   * Изменение перс. данных.
   */
  async updatePerson(form: TPersonForm, opt?: TdRHandlerOptions) {
    const url = 'persons/' + form._id
    const dR = await this._api.post<TPerson>(url, form)
    return this.dRHandler(dR, opt)
  }
}
