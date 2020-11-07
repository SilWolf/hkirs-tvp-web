import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_ROOT,
  timeout: 30000,
})

instance.interceptors.response.use(
  (response) => response.data,
  (e) => {
    // eslint-disable-next-line no-console
    console.error(e)

    throw e
  }
)

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
  require('./apiMock.service').default(instance)
}

const apis = {
  request: <T>(config: AxiosRequestConfig): Promise<T> => {
    return instance.request<T, T>(config)
  },
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return instance.get<T, T>(url, config)
  },
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return instance.delete<T, T>(url, config)
  },
  head: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return instance.head<T, T>(url, config)
  },
  options: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return instance.options<T, T>(url, config)
  },
  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return instance.post<T, T>(url, data, config)
  },
  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return instance.put<T, T>(url, data, config)
  },
  patch: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return instance.patch<T, T>(url, data, config)
  },
}

const defaultExport = {
  ...instance,
  ...apis,
}
export default defaultExport

export const getGoogleSignInLink = () => {
  return `${process.env.REACT_APP_API_BASE_ROOT}/connect/google`
}
