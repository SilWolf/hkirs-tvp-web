import { AxiosInstance } from 'axios'
import signInRes from '../mock/signIn.mock.json'
import getCourseRes from '../mock/getCourse.mock.json'
import getClassByClassIdRes from '../mock/getClassByClassId.mock.json'
import getELearningByClassIdRes from '../mock/getELearningByClassId.mock.json'
import getClassesByUserIdRes from '../mock/getClassesByUserId.mock.json'

var MockAdapter = require('axios-mock-adapter')

const clientMock = (axios: AxiosInstance): void => {
  const mock = new MockAdapter(axios)

  mock.onPost('/auth/local').reply(200, signInRes)

  mock.onGet(/\/courses\/\w+/).reply(200, getCourseRes)
  mock.onGet(/\/classes\/\w+/).reply(200, getClassByClassIdRes)
  mock.onGet(/\/classes/).reply(200, getClassesByUserIdRes)
  mock.onGet(/\/e-learnings/).reply(200, getELearningByClassIdRes)

  mock.onAny().passThrough()
}

export default clientMock
