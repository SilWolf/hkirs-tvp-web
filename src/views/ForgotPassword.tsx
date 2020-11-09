import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import {
  Card,
  FormGroup,
  Form,
  Input,
  Label,
  FormFeedback,
  CardText,
  Alert,
} from 'reactstrap'
import Button from '../components/Button'

import authService from '../services/auth.service'
import { Link } from 'react-router-dom'

type FormData = {
  email: string
}

const ForgotPasswordPageContainer = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`
const ForgotPasswordCard = styled(Card)`
  width: 400px;
  max-width: 100%;
  margin-top: 60px;
`
const Center = styled.div`
  text-align: center;
`

const ForgotPassword = () => {
  const { register, handleSubmit, errors } = useForm<FormData>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isForgotPasswordEmailSent, setIsForgotPasswordEmailSent] = useState<
    boolean
  >(false)

  const onSubmit = (data: FormData) => {
    setIsLoading(true)
    authService
      .forgotPassword(data.email)
      .then(() => {
        setIsForgotPasswordEmailSent(true)
      })
      .catch(() => {
        setIsForgotPasswordEmailSent(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="content">
      <ForgotPasswordPageContainer>
        <ForgotPasswordCard body>
          {isForgotPasswordEmailSent && (
            <Alert color="success" className="text-center">
              <i
                className="nc-icon nc-email-85"
                style={{ fontSize: '4em' }}
              ></i>
              <div>
                一封重置密碼郵件已發送到您的信箱，請檢查並跟從指示以重置您的密碼。若沒有收到，請檢查您的垃圾郵件或重新發送。
              </div>
            </Alert>
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <CardText>
                請輸入您在註冊時所使用的電郵，我們將會發送一封帶有連結的郵件，請跟隨指示重置您的密碼。
              </CardText>
              <Label>電郵</Label>
              <Input
                type="text"
                name="email"
                innerRef={register({
                  required: '請輸入電郵',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '錯誤的電郵格式',
                  },
                })}
                invalid={!!errors.email}
              />
              {errors.email && (
                <FormFeedback>{errors.email?.message}</FormFeedback>
              )}
            </FormGroup>
            <Button color="primary" type="submit" block isLoading={isLoading}>
              提交
            </Button>

            <Center>
              <Button color="link" tag={Link} to="/sign-in">
                登入
              </Button>
            </Center>
          </Form>
        </ForgotPasswordCard>
      </ForgotPasswordPageContainer>
    </div>
  )
}

export default ForgotPassword
