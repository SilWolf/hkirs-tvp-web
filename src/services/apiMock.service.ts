import { AxiosInstance } from 'axios'
import getCharactersRes from '../mock/getCharacters.mock.json'

var MockAdapter = require('axios-mock-adapter')

const clientMock = (axios: AxiosInstance): void => {
  const mock = new MockAdapter(axios)

  mock.onGet('/characters').reply(200, getCharactersRes)

  mock.onAny().passThrough()
}

export default clientMock
