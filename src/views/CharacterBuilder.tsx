import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
  Col,
  FormFeedback,
} from 'reactstrap'
import randomNpcHelper from '../helpers/randomNpc.helepr'

enum FormStep {
  BASIC = 0,
  BIO = 1,
  FAMILY = 11,
  CLASS_AND_ABILITY_AND_PROFICIENCY = 2,
}

enum Gender {
  Male = 'M',
  Female = 'F',
}

type FormData = {
  name: string
  nickname: string
  gender: Gender
  race: string
  background: string
  age: number
  grow: string
  reason: string
}

const Wrapper = styled.div`
  .form-group {
    margin-bottom: 2rem;
  }
`

const CharacterBuilder = () => {
  const [formStep, setFormStep] = useState<FormStep>(FormStep.BASIC)
  const { register, handleSubmit, getValues, setValue, errors } = useForm<
    FormData
  >()

  let content = <></>

  if (formStep === FormStep.BASIC) {
    const onSubmit = () => {
      setFormStep(FormStep.BIO)
    }

    const handleRandomName = () => {
      const firstNameObj = randomNpcHelper.randomByCategory('firstName')
      const lastNameObj = randomNpcHelper.randomByCategory('lastName')
      setValue('name', `${firstNameObj.value}．${lastNameObj.value}`)
    }

    content = (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm={6}>
            <FormGroup>
              <Label>性別</Label>
              <Input
                type="select"
                name="gender"
                innerRef={register({
                  required: {
                    value: true,
                    message: '必須選擇一個性別。不接受多性別或無性別',
                  },
                })}
              >
                <option value={Gender.Male}>男／雄性</option>
                <option value={Gender.Female}>女／雌性</option>
              </Input>
              <FormText color="muted">
                儘管性別不會影響角色的能力，但也許會讓您更喜歡您的角色。
              </FormText>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup>
              <Label>種族</Label>
              <Input
                type="select"
                name="race"
                innerRef={register({
                  required: {
                    value: true,
                    message: '必須選擇一個種族',
                  },
                })}
              >
                <option value="human">人類 Human</option>
                <option value="dragonborn">龍裔 Dragonborn</option>
                <option value="elf">精靈 Elf</option>
                <option value="dwarf">矮人 Dwarf</option>
                <option value="halfling">半身人 Halfling</option>
                <option value="gnome">侏儒 Gnome</option>
                <option value="tiefling">魔人 Tiefling</option>
                <option value="half-elf">半精靈 Half-elf</option>
                <option value="half-orc">半獸人 Half-orc</option>
              </Input>
              <FormText color="muted">
                不同的種族各有不同的特性，在早期的冒險生涯中，種族的天賦舉足輕重。
              </FormText>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <FormGroup>
              <Label>角色全名</Label>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <Input
                    type="text"
                    name="name"
                    innerRef={register({
                      required: {
                        value: true,
                        message: '必須填寫角色名字',
                      },
                    })}
                    invalid={!!errors.name}
                  />
                </div>
                <div>
                  <Button
                    className="btn btn-primary btn-neutral"
                    style={{ margin: 0, marginLeft: 8 }}
                    onClick={handleRandomName}
                  >
                    隨機
                  </Button>
                </div>
              </div>

              <FormText color="muted">
                根據種族及性別的不同，角色的名字可以有很大的差異，按通用語慣常的表達方式，一般在名字後面會跟隨代表其家族的姓氏。
                <br />
                脫離了家族，或不知道自己家族的人，為了方便在城市中的生活，會考慮用個假姓氏。
              </FormText>
              {errors.name && (
                <FormFeedback>{errors.name?.message}</FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup>
              <Label>別名</Label>
              <Input
                type="text"
                name="nickname"
                innerRef={register({
                  required: {
                    value: true,
                    message: '必須填寫角色的別名',
                  },
                })}
                invalid={!!errors.nickname}
              />
              <FormText color="muted">
                一個能代表角色又有親切感的稱呼，是別人給角色起的簡稱。通常會參考外觀上最鮮明的特徵，例如紋身、傷疤、膚色，或是姓名的諧音、稱號等。如果角色有相當地位的話，別名可能是姓氏加上頭銜。
              </FormText>
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Button type="submit" color="success">
            下一步: 冒險之前的故事
          </Button>
        </FormGroup>
      </Form>
    )
  } else if (formStep === FormStep.BIO) {
    const character = {
      name: getValues('name'),
      thirdPerson: getValues('gender') === Gender.Female ? '她' : '他',
      background: getValues('background'),
    }

    const onSubmit = () => {
      setFormStep(FormStep.CLASS_AND_ABILITY_AND_PROFICIENCY)
    }

    content = (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Button
            type="button"
            onClick={() => {
              setFormStep(FormStep.BASIC)
            }}
            color="neutral"
          >
            返回前一步
          </Button>
        </FormGroup>

        <h5>我們多聊聊有關 {character.name} 以前的故事吧？</h5>

        <FormGroup>
          <Label>背景</Label>
          <Input type="select" name="background" innerRef={register()} />
          <FormText color="muted">
            在<strong>{character.name}</strong> 決心冒險時，
            <strong>{character.thirdPerson}</strong>
            本來是什麼身分呢？不同的背景會讓
            <strong>{character.thirdPerson}</strong>有不同的優勢及特質。
          </FormText>
        </FormGroup>

        <FormGroup>
          <Label>年齡</Label>
          <FormText>
            <strong>{character.name}</strong> 在當上冒險者時多大呢？
          </FormText>
          <Input type="select" name="age" innerRef={register()}>
            <option value={0}>剛成年</option>
            <option value={1}>成年不久</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label>成長</Label>
          <FormText>
            <strong>{character.name}</strong>{' '}
            是在怎樣的環境下長大成人？又有什麼人物陪伴著
            {character.thirdPerson}成長？{character.thirdPerson}
            又是怎樣成為一名 {character.background} 的？
          </FormText>
          <Input type="textarea" name="grow" rows={6} innerRef={register()} />
          <FormText color="muted">
            請描寫你認為一段對塑造<strong>{character.name}</strong>
            最關鍵的成長經歷。
            根據角色的背景，每人的成長經歷都不一樣，而這段經歷會塑造他／她的個性、特質、價值觀等等。
            <br />
            平凡的角色可能會和父母及兄弟姐妹，在平凡的家庭下成長，並在成年之前到學校上學習冒險的知識，希望世界和平；
            <br />
            悲慘的角色也許經歷過家園被毀滅，無力掙扎、爆發潛能的時候。
          </FormText>
        </FormGroup>

        <FormGroup>
          <Label>冒險的理由</Label>
          <FormText>
            要冒險就意味著暴露在危險之中，是城市長大的人無法想像的辛苦事，挨餓、風吹雨打等等都是冒險的一部分。
            <br />
            足以讓 <strong>{character.name}</strong>{' '}
            放棄舒適的生活，也要冒險的理由是什麼？推動
            {character.thirdPerson}前進的信念和動力是什麼？
          </FormText>
          <Input type="textarea" name="reason" rows={6} innerRef={register()} />
          <FormText color="muted">
            請描寫你認為一段對塑造<strong>{character.name}</strong>
            最關鍵的成長經歷。
            根據角色的背景，每人的成長經歷都不一樣，而這段經歷會塑造他／她的個性、特質、價值觀等等。
            <br />
            平凡的角色可能會和父母及兄弟姐妹，在平凡的家庭下成長，並在成年之前到學校上學習冒險的知識，希望世界和平；
            <br />
            悲慘的角色也許經歷過家園被毀滅，無力掙扎、爆發潛能的時候。
          </FormText>
        </FormGroup>

        <FormGroup>
          <Label>目標</Label>
          <FormText>
            試著用不多於30字總結 <strong>{character.name}</strong> 冒險的目標
          </FormText>
          <Input type="text" name="objective" innerRef={register()} />
          <FormText color="muted">
            無論是誰，都會有目的才會去犯險，且往往十分簡單直觀、一說出口就能產生共嗚，且成為角色的魅力所在。
            <br />
            目標往往也跟角色故事脫不了關係的。
          </FormText>
        </FormGroup>

        <FormGroup>
          <Button type="submit" color="success">
            下一步: 職業、能力值、技能、熟練
          </Button>
        </FormGroup>
      </Form>
    )
  } else if (formStep === FormStep.CLASS_AND_ABILITY_AND_PROFICIENCY) {
    const character = {
      name: getValues('name'),
      thirdPerson: getValues('gender') === Gender.Female ? '她' : '他',
      background: getValues('background'),
    }

    const onSubmit = () => {
      setFormStep(FormStep.CLASS_AND_ABILITY_AND_PROFICIENCY)
    }

    content = (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Button
            type="button"
            onClick={() => {
              setFormStep(FormStep.BASIC)
            }}
            color="neutral"
          >
            返回前一步
          </Button>
        </FormGroup>

        <h5>接著，來說說 {character.name} 戰鬥的英姿，如何？</h5>

        <FormGroup>
          <Label>職業</Label>
          <Input type="select" name="background" innerRef={register()} />
          <FormText color="muted">
            <strong>{character.name}</strong> 的戰鬥職業是什麼？
          </FormText>
        </FormGroup>

        <FormGroup>
          <Label>學習</Label>
          <FormText>
            <strong>{character.name}</strong>{' '}
            是如何學懂戰鬥，及/或得到戰鬥的力量的？
          </FormText>
          <Input type="textarea" name="grow" rows={6} innerRef={register()} />
          <FormText color="muted">
            沒幾個人是天生就學會戰鬥的，不過毫無疑問的是，能成為為人知曉的冒險者，都是天賦異稟的。
            <br />
            <strong>{character.name}</strong>
            有導師嗎？提供力量的是某位惡魔嗎？還是沒老師，但從小就一直從實戰中學習嗎？
            <br />
            這些設定都可能跟角色的背景息息相關，考慮到角色的戰鬥能力從何而來，也會讓角色形象更加具體。
          </FormText>
        </FormGroup>

        <FormGroup>
          <Label>能力值</Label>
          <FormText>
            請按指示填寫角色的能力值分佈。系統將會描述數字背後的世界觀意義，以供參考。
          </FormText>
          <Input type="textarea" name="reason" rows={6} innerRef={register()} />
          <FormText color="muted">
            在角色當上冒險者(Lv.1)開始，能力值就已經幾乎達到一般人的上限了，但世界上還是有很多超出角色想像，又無法達到的強大。
            <br />
            你知道嗎？冒險者總還是會被哥布林們給打到頭破血流，並不是角色太弱了，而是身為魔物之一的哥布林，要比你所想像的強得多哦！
          </FormText>
        </FormGroup>

        <FormGroup>
          <Label>技能</Label>
          <FormText>
            勾選角色擁有的技能，選項由背景及職業而定，有時種族也會提供技能。
          </FormText>
          <Input type="text" name="objective" innerRef={register()} />
          <FormText color="muted">
            要掌握一種新的技能十分困難，光是擁有熟練值，就可以在相應領域成為一名導師，甚至領頭羊了。
          </FormText>
        </FormGroup>

        <FormGroup>
          <Button type="submit" color="success">
            下一步: 職業、能力值、技能、熟練
          </Button>
        </FormGroup>
      </Form>
    )
  }

  return (
    <>
      <div className="content">
        <Wrapper>{content}</Wrapper>
      </div>
    </>
  )
}

export default CharacterBuilder
