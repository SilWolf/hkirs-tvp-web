import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormGroup, Input, Label } from 'reactstrap'

type FormData = {
  name: string
}

const CharacterBuilder = () => {
  const { register, handleSubmit, errors, setError } = useForm<FormData>()

  return (
    <>
      <div className="content">
        <Form>
          <FormGroup>
            <Label>名字</Label>
            <Input type="text" name="name" innerRef={register()} />
          </FormGroup>
        </Form>
      </div>
    </>
  )
}

export default CharacterBuilder
