import { AxiosInstance } from 'axios'
import signInRes from '../mock/signIn.mock.json'
import getCourseRes from '../mock/getCourse.mock.json'

var MockAdapter = require('axios-mock-adapter')

const clientMock = (axios: AxiosInstance): void => {
  const mock = new MockAdapter(axios)

  mock.onPost('/auth/local').reply(200, signInRes)

  mock.onGet(/\/courses\/\w+/).reply(200, getCourseRes)

  mock.onAny().passThrough()
}

export default clientMock
