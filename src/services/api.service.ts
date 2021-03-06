import axios, { AxiosRequestConfig } from 'axios'

import apiMock from './apiMock.service'

export type ExtendedAxiosRequestConfig = AxiosRequestConfig

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_ROOT,
	timeout: 30000,
})

instance.interceptors.request.use((config: ExtendedAxiosRequestConfig) => {
	return config
})
instance.interceptors.response.use(
	(response) => response.data,
	(e) => {
		// eslint-disable-next-line no-console
		console.error(e)

		throw e
	}
)

if (process.env.USE_MOCK_DATA) {
	apiMock(instance)
}

const apis = {
	request: <T>(config: ExtendedAxiosRequestConfig): Promise<T> => {
		return instance.request<T, T>(config)
	},
	get: <T>(url: string, config?: ExtendedAxiosRequestConfig): Promise<T> => {
		return instance.get<T, T>(url, config)
	},
	delete: <T>(url: string, config?: ExtendedAxiosRequestConfig): Promise<T> => {
		return instance.delete<T, T>(url, config)
	},
	head: <T>(url: string, config?: ExtendedAxiosRequestConfig): Promise<T> => {
		return instance.head<T, T>(url, config)
	},
	options: <T>(
		url: string,
		config?: ExtendedAxiosRequestConfig
	): Promise<T> => {
		return instance.options<T, T>(url, config)
	},
	post: <T>(
		url: string,
		data?: any,
		config?: ExtendedAxiosRequestConfig
	): Promise<T> => {
		return instance.post<T, T>(url, data, config)
	},
	put: <T>(
		url: string,
		data?: any,
		config?: ExtendedAxiosRequestConfig
	): Promise<T> => {
		return instance.put<T, T>(url, data, config)
	},
	patch: <T>(
		url: string,
		data?: any,
		config?: ExtendedAxiosRequestConfig
	): Promise<T> => {
		return instance.patch<T, T>(url, data, config)
	},
}

const setAuthorization = (authorization: string) => {
	instance.defaults.headers.common['Authorization'] = `Bearer ${authorization}`
}
const removeAuthorization = () => {
	delete instance.defaults.headers.common['Authorization']
}

const defaultExport = {
	...instance,
	...apis,
	setAuthorization,
	removeAuthorization,
}
export default defaultExport

export const getGoogleSignInLink = () => {
	return `${process.env.REACT_APP_API_BASE_ROOT}/connect/google`
}
