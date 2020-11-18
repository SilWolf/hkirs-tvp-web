/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
import { useAsync } from 'react-async'
import { useParams } from 'react-router-dom'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Spinner,
} from 'reactstrap'
import PageBrandname from '../components/Page/PageBrand'
import PageTitle from '../components/Page/PageTitle'
import {
  getActivitiesByCharacterId,
  getCharacterById,
} from '../helpers/api.helper'
import { Activity } from '../types/activity.type'
import { Character } from '../types/character.type'

const getCharacterByIdFn = ({ characterId }: any) => {
  return getCharacterById(characterId || 'foo')
}
const getActivitiesByCharacterIdFn = ({ characterId }: any) => {
  return getActivitiesByCharacterId(characterId || 'foo')
}

const CharacteDetail = () => {
  const { characterId } = useParams<{ characterId: string }>()

  const characterAsync = useAsync<Character>({
    promiseFn: getCharacterByIdFn,
    characterId,
  })
  const activitiesAsync = useAsync<Activity[]>({
    promiseFn: getActivitiesByCharacterIdFn,
    characterId,
  })

  if (characterAsync.isLoading) {
    return (
      <div className="content">
        <Spinner type="grow" color="primary" />
      </div>
    )
  }

  const character = characterAsync.data as Character
  const classesString = character.classConfigs
    .map((classConfig) => `${classConfig.class.render.zh} ${classConfig.level}`)
    .join(' / ')

  return (
    <>
      <PageTitle>{character.name}</PageTitle>
      <PageBrandname>{character.name}</PageBrandname>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img alt="..." src={character.coverImage?.url} />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={character.portrait?.url}
                    />
                    <h5 className="title">{character.name}</h5>
                  </a>
                  <p className="description">@{character.player.username}</p>
                </div>
                <p className="description text-center">{character.motto}</p>
                <p className="description text-center">{classesString}</p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                      <h5>
                        {character.race.render.zh} <br />
                        <small>種族</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h5>
                        {character.city.name} <br />
                        <small>背景</small>
                      </h5>
                    </Col>
                    <Col className="mr-auto" lg="3">
                      <h5>
                        {character.city.name} <br />
                        <small>出生地</small>
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Team Members</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled team-members">
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={require('../assets/img/faces/ayo-ogunseinde-2.jpg')}
                          />
                        </div>
                      </Col>
                      <Col md="7" xs="7">
                        DJ Khaled <br />
                        <span className="text-muted">
                          <small>Offline</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={require('../assets/img/faces/joe-gardner-2.jpg')}
                          />
                        </div>
                      </Col>
                      <Col md="7" xs="7">
                        Creative Tim <br />
                        <span className="text-success">
                          <small>Available</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={require('../assets/img/faces/clem-onojeghuo-2.jpg')}
                          />
                        </div>
                      </Col>
                      <Col className="col-ms-7" xs="7">
                        Flume <br />
                        <span className="text-danger">
                          <small>Busy</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">活動紀錄</CardTitle>
              </CardHeader>
              <CardBody>
                {activitiesAsync.isLoading && (
                  <Spinner type="grow" color="primary" />
                )}
                {activitiesAsync.data &&
                  activitiesAsync.data.map((activity) => {
                    const reward = activity.characterRewards.find(
                      (_) => _.character.id === characterId
                    )
                    return (
                      <div key={activity.id}>
                        <div>{activity.title}</div>
                        <div>
                          <span>{reward?.xp || '--'} XP</span>{' '}
                          <span>{reward?.gp || '--'} GP</span>
                        </div>
                      </div>
                    )
                  })}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default CharacteDetail
