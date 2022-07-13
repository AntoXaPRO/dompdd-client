import { SchemaOf, object, string } from 'yup'
import { ValidEntity } from 'axp-ts'
import { TAccount } from './account'

/**
 * Тип данных формы авторизации.
 */
export type TAuthForm = {
  login: string
  password: string
  client?: string
}

/**
 * Схема валидации формы авторизации.
 */
export const authFormSchemaValid: SchemaOf<TAuthForm> = object({
  client: string()
    .meta({ label: 'Клиент' })
    .max(60),
  login: string()
    .meta({ label: 'Логин' })
    .lowercase()
    .trim()
    .required('Укажите логин'),
  password: string()
    .meta({ label: 'Пароль' })
    .trim()
    .required('Укажите пароль')
})

/**
 * Форма авторизации.
 */
export class AuthFormModel extends ValidEntity<TAuthForm> {
  constructor(obj: TAuthForm) {
    super(obj, authFormSchemaValid)
  }
}

/**
 * Данные для возврата после авторизации/регистрации.
 */
export type TAuthObj = {
  token: string
  account: TAccount
}
