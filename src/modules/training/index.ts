import { TdRHandlerOptions, TFindFilter } from '..'
import _BaseModule from '../base-module'
import type Api from '../../api'
import type Notification from '../../notification'

export * from './entities'
import {
  TTrainingGroup,
  TTrainingGroupType,
  TTrainingGroupCategory,
  TTrainingGroupFilter,
  TTrainingGroupForm,
  TrainingGroupFormModel
} from './entities'

/**
 * Модуль обучения.
 */
export default class TraningModule extends _BaseModule {
  constructor(api: Api, notification: Notification) {
    super(api, notification)
  }

  /**
   * Создание модели формы группы обучения.
   */
  createGroupFormModel(obj?: TTrainingGroup) {
    return new TrainingGroupFormModel(Object.assign({}, obj))
  }

  /**
   * Выборка групп обучения.
   */
  async findGroup(filter?: TFindFilter<TTrainingGroupFilter>, opt?: TdRHandlerOptions) {
    const url = this.getUrl('training/groups', filter)
    const dR = await this._api.get<TTrainingGroup[]>(url)
    return this.dRHandler(dR, opt)
  }

  /**
   * Найти группу по ИД.
   */
  async findGroupOneById(id: string, opt?: TdRHandlerOptions) {
    const url = 'training/groups/' + id
    const dR = await this._api.get<TTrainingGroup>(url)
    return this.dRHandler(dR, opt)
  }

  /**
   * Выборка типов групп обучения.
   */
  async findGroupType(filter?: any, opt?: TdRHandlerOptions) {
    const url = this.getUrl('training/groups/types', filter)
    const dR = await this._api.get<TTrainingGroupType[]>(url)
    return this.dRHandler(dR, opt)
  }

  /**
   * Выборка категорий групп обучения.
   */
  async findGroupCategory(filter?: any, opt?: TdRHandlerOptions) {
    const url = this.getUrl('training/groups/categories', filter)
    const dR = await this._api.get<TTrainingGroupCategory[]>(url)
    return this.dRHandler(dR, opt)
  }

  /**
   * Сознание/Изменение.
   */
  async createOrUpdate(form: TTrainingGroupForm, opt?: TdRHandlerOptions) {
    const url = 'training/groups'
    const dR = await this._api.post<TTrainingGroup>(url, form)
    return this.dRHandler(dR, opt)
  }
}
