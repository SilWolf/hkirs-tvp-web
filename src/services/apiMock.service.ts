import { AxiosInstance } from 'axios'

var MockAdapter = require('axios-mock-adapter')

const clientMock = (axios: AxiosInstance): void => {
  const mock = new MockAdapter(axios)

  mock.onAny().passThrough()
}

export default clientMock
