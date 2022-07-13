import { ValidEntity } from 'axp-ts'

/**
 * Базовая сущность БД.
 */
export type TBaseDbEntity = {
  _id: string
  dateCreate?: number
  dateUpdate?: number
}

/**
 * Базовая модель для валидирования сущностей из БД.
 */
export class BaseDbValidEntity<T> extends ValidEntity<T>
{
  _id: string
  dateCreate?: number
  dateUpdate?: number

  constructor(obj: any, schema: any) {
    super(obj, schema)

    this._id = obj._id || ''
    this.dateCreate = obj.dateCreate
    this.dateUpdate = obj.dateUpdate
  }
}
