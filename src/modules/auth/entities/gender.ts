/**
 * Перечисление гендеров.
 */
export enum GenderEnum {
  man = 'man',
  woman = 'woman'
}

/**
 * Тип гендера.
 */
export type TGender = keyof typeof GenderEnum

/**
 * Список значений типов гендера.
 */
export const genders = Object.keys(GenderEnum)
