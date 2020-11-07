import axios from 'axios'

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
  require('./apiMock').default(instance)
}
