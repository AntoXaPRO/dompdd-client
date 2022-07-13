import { DataResultEntity } from 'axp-ts'
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

/**
 * Тип данных (АПИ Сервер).
 */
export type TApiServer = {
  name: string
  apiUrl: string
}

/**
 * Класс для работы с АПИ.
 */
export default class Api {
  private _servers: TApiServer[]
  private _axios: AxiosInstance

  private _token?: string
  private _server?: TApiServer
  private _unit?: string

  constructor(servers: TApiServer[]) {
    this._servers = servers
    this._axios = axios.create()
  }

  /**
   * Возвращает заголовки для запроса.
   */
  private get _config() {
    let headers: any = {}
    if (this._token) headers.Authorization = 'Bearer ' + this._token
    if (this._unit) headers.unit = this._unit
    return { headers }
  }

  /**
   * Список серверов.
   */
  get servers(): TApiServer[] {
    return this._servers || []
  }

  /**
   * Текущий сервер.
   */
  get server(): TApiServer | undefined {
    return this._server
  }

  /**
   * Ид подразделения.
   */
  get unit (): string | undefined {
    return this._unit
  }

  /**
   * Установка серера.
   */
  setServer(name: string): void {
    const server = this._servers.find((e) => e.name === name)
    if (server) {
      this._server = server
      this._axios.defaults.baseURL = server.apiUrl
    }
  }

  /**
   * Добавление сервера.
   */
  addServer(server: TApiServer) {
    this._servers.push(server)
  }

  /**
   * Удаление сервера.
   */
  removeServer(name: string) {
    this._servers = this._servers.filter(e => e.name !== name)
  }

  /**
   * Установка токена.
   */
  setToken(token: string): void {
    this._token = token
  }

  /**
   * Очистка токена.
   */
  clearToken(): void {
    this._token = undefined
  }

  /**
   * Установка подразделения.
   */
  setUnit(value: string) {
    this._unit = value
  }

  /**
   * Формирует полный адрес для запроса.
   */
  getUrl(path: string): string {
    return path.replace(/^\//, '')
  }

  /**
   * Get запрос.
   */
  get<T>(
    url: string,
    cb?: (dR: DataResultEntity<T>) => void
  ): Promise<DataResultEntity<T>> {
    const prom = this._axios.get(this.getUrl(url), this._config)
    return this.dataResult(prom, cb)
  }

  /**
   * Post запрос.
   */
  post<T>(
    url: string,
    obj: any,
    cb?: (dR: DataResultEntity<T>) => void
  ): Promise<DataResultEntity<T>> {
    const prom = this._axios.post(this.getUrl(url), obj, this._config)
    return this.dataResult(prom, cb)
  }

  /**
   * Put запрос.
   */
  put<T>(
    url: string,
    obj: any,
    cb?: (dR: DataResultEntity<T>) => void
  ): Promise<DataResultEntity<T>> {
    const prom = this._axios.put(this.getUrl(url), obj, this._config)
    return this.dataResult(prom, cb)
  }

  /**
   * Delete запрос.
   */
  delete<T>(
    url: string,
    cb?: (dR: DataResultEntity<T>) => void
  ): Promise<DataResultEntity<T>> {
    const prom = this._axios.delete(this.getUrl(url), this._config)
    return this.dataResult(prom, cb)
  }

  /**
   * Модель данных результата запроса.
   */
  dataResult<T>(
    axiosRes: Promise<AxiosResponse<DataResultEntity<T>>>,
    cb?: (dR: DataResultEntity<T>) => void
  ): Promise<DataResultEntity<T>> {
    return new Promise(async (resolve) => {
      try {
        // Успешный запрос.
        const { data } = await axiosRes
        if (cb) cb(data)
        resolve(data)
      } catch (ex: any) {
        // Обработка ошибки.
        const error: AxiosError<DataResultEntity<T>> = ex
        const { response } = error

        if (response) {
          const dRError = new DataResultEntity<any>()

          dRError.status = response.data.status || response.status
          dRError.message = response.data.message || response.statusText
          dRError.setData(response.data.data || response.data)

          if (response.data.errors) {
            for (const error of response.data.errors) {
              dRError.errors.push(error)
            }
          } else {
            dRError.errors.push({ code: 'message', text: dRError.message })
          }

          if (cb) cb(dRError)
          resolve(dRError)
        } else {
          // Неизвестная ошибка.
          const dRUnknown = new DataResultEntity<any>()

          dRUnknown.status = 520
          dRUnknown.message = 'Unknown Error'
          dRUnknown.errors.push({ code: 'unknown_error', text: error.message })

          if (cb) cb(dRUnknown)
          resolve(dRUnknown)
        }
      }
    })
  }
}
