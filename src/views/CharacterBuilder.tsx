import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, FormGroup, FormText, Input, Label } from 'reactstrap'

enum FormStep {
  BASIC = 0,
  BIO = 1,
  FAMILY = 11,
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

const CharacterBuilder = () => {
  const [formStep, setFormStep] = useState<FormStep>(FormStep.BASIC)
  const { register, handleSubmit, getValues } = useForm<FormData>()

  let content = <></>

  if (formStep === FormStep.BASIC) {
    const onSubmit = () => {
      setFormStep(FormStep.BIO)
    }

    content = (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>角色全名</Label>
          <Input type="text" name="name" innerRef={register()} />
          <FormText color="muted">
            根據種族及性別的不同，角色的名字可以有很大的差異，按通用語慣常的表達方式，一般在名字後面會跟隨代表其家族的姓氏。
          </FormText>
        </FormGroup>

        <FormGroup>
          <Label>別名</Label>
          <Input type="text" name="nickname" innerRef={register()} />
          <FormText color="muted">
            一個能代表角色又有親切感的稱呼，是別人給角色起的簡稱。通常會參考外觀上最鮮明的特徵，例如紋身、傷疤、膚色，或是姓名的諧音、稱號等。如果角色有相當地位的話，別名可能是姓氏加上頭銜。
          </FormText>
        </FormGroup>

        <FormGroup>
          <Label>性別</Label>
          <Input type="select" name="gender" innerRef={register()}>
            <option value={Gender.Male}>男／雄性</option>
            <option value={Gender.Female}>女／雌性</option>
          </Input>
          <FormText color="muted">
            儘管性別不會影響角色的能力，但也許會讓您更喜歡您的角色。
          </FormText>
        </FormGroup>

        <FormGroup>
          <Label>種族</Label>
          <Input type="select" name="race" innerRef={register()} />
          <FormText color="muted">
            不同的種族各有不同的特性，在早期的冒險生涯中，種族的天賦舉足輕重。
          </FormText>
        </FormGroup>

        <FormGroup>
          <Label>背景</Label>
          <Input type="select" name="background" innerRef={register()} />
          <FormText color="muted">
            在角色決心冒險時，您的角色是什麼身分呢？不同的背景會讓您的角色有不同的優勢。
          </FormText>
        </FormGroup>

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

    content = (
      <Form>
        <h5>我們多聊聊有關 {character.name} 以前的故事吧？</h5>
        <FormGroup>
          <Label>年齡</Label>
          <FormText>{character.name} 在當上冒險者時多大呢？</FormText>
          <Input type="select" name="age" innerRef={register()}>
            <option value={0}>剛成年</option>
            <option value={1}>成年不久</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label>成長</Label>
          <FormText>
            {character.name} 是在怎樣的環境下長大成人？又有什麼人物陪伴著
            {character.thirdPerson}成長？最終{character.thirdPerson}
            是怎樣成為一名
            {character.background}的？
          </FormText>
          <Input type="textarea" name="grow" innerRef={register()} />
          <FormText color="muted">
            請描寫你認為一段對塑造{character.name}最關鍵的成長經歷。
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
            足以讓 {character.name} 放棄舒適的生活，也要冒險的理由是什麼？推動
            {character.thirdPerson}前進的信念和動力是什麼？
          </FormText>
          <Input type="textarea" name="reason" innerRef={register()} />
          <FormText color="muted">
            請描寫你認為一段對塑造{character.name}最關鍵的成長經歷。
            根據角色的背景，每人的成長經歷都不一樣，而這段經歷會塑造他／她的個性、特質、價值觀等等。
            <br />
            平凡的角色可能會和父母及兄弟姐妹，在平凡的家庭下成長，並在成年之前到學校上學習冒險的知識，希望世界和平；
            <br />
            悲慘的角色也許經歷過家園被毀滅，無力掙扎、爆發潛能的時候。
          </FormText>
        </FormGroup>

        <FormGroup>
          <Label>目標</Label>
          <FormText>試著用不多於20字總結 {character.name} 冒險的目標</FormText>
          <Input type="textarea" name="objective" innerRef={register()} />
          <FormText color="muted">
            無論是誰，都會有目的才會去犯險，且往往十分簡單直觀、一說出口就能產生共嗚，且成為角色的魅力所在。
            <br />
            目標往往也跟角色故事脫不了關係的。
          </FormText>
        </FormGroup>
      </Form>
    )
  }

  return (
    <>
      <div className="content">{content}</div>
    </>
  )
}

export default CharacterBuilder
