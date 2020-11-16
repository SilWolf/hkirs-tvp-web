import { AxiosInstance } from 'axios'
import getCharacterRes from '../mock/getCharacter.mock.json'
import getCharactersRes from '../mock/getCharacters.mock.json'

var MockAdapter = require('axios-mock-adapter')

const clientMock = (axios: AxiosInstance): void => {
  const mock = new MockAdapter(axios)

  mock.onGet('/characters/foo').reply(200, getCharacterRes)
  mock.onGet('/characters').reply(200, getCharactersRes)

  mock.onAny().passThrough()
}

export default clientMock
