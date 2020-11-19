import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, FormGroup, FormText, Input, Label } from 'reactstrap'

type FormData = {
  name: string
  nickname: string
  gender: string
  race: string
  background: string
}

enum FormStep {
  BASIC = 0,
  BIO = 1,
  FAMILY = 11,
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
          <Input type="select" name="gender" innerRef={register()} />
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
            在角色決心冒險之前，您的角色是什麼身分呢？不同的背景會讓您的角色有不同的優勢。
          </FormText>
        </FormGroup>

        <FormGroup>
          <Button type="submit" color="success">
            下一步
          </Button>
        </FormGroup>
      </Form>
    )
  } else if (formStep === FormStep.BIO) {
    const character = {
      name: getValues('name'),
    }

    content = (
      <Form>
        <h5>我們多聊聊有關 {character.name} 以前的故事吧？</h5>

        <FormGroup>
          <Label> {character.name} </Label>
          <Input type="select" name="background" innerRef={register()} />
          <FormText color="muted">
            在角色決心冒險之前，您的角色是什麼身分呢？不同的背景會讓您的角色有不同的優勢。
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
