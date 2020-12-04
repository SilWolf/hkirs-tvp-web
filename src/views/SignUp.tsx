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
  FormText,
  CardText,
} from 'reactstrap'
import Button from '../components/Button'

import authHelper from '../helpers/auth.helper'
import { getGoogleSignInLink } from '../services/api.service'
import { Link } from 'react-router-dom'

type FormData = {
  email: string
  password: string
  confirmPassword: string
}

const SignUpPageContainer = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`
const SignUpCard = styled(Card)`
  width: 400px;
  max-width: 100%;
  margin-top: 60px;
`
const Center = styled.div`
  text-align: center;
`

const SignUp = () => {
  const { register, handleSubmit, errors, setError, watch } = useForm<
    FormData
  >()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSignUpSuccess, setIsSignUpSuccess] = useState<boolean>(false)

  const onSubmit = (data: FormData) => {
    setIsLoading(true)
    authHelper
      .signUp(data.email, data.password)
      .then(() => {
        setIsSignUpSuccess(true)
      })
      .catch((e) => {
        console.log(e.response)
        switch (e.response?.status) {
          case 400: {
            setError('email', {
              message: '註冊失敗: 此電郵已被註冊',
            })
            break
          }
          default: {
            setError('email', {
              message: '註冊失敗: 未知的錯誤',
            })
          }
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  if (isSignUpSuccess) {
    return (
      <div className="content">
        <SignUpPageContainer>
          <SignUpCard body className="text-center">
            <CardText>
              <i
                className="nc-icon nc-email-85"
                style={{ fontSize: '4em' }}
              ></i>
            </CardText>
            <CardText>
              一封驗證電郵已經發到您的信箱，請按指示完成註冊程序。若沒有收到，請檢查垃圾郵件或重新發送。
            </CardText>

            <hr />

            <Button color="link" tag={Link} to="/sign-in">
              登入
            </Button>
          </SignUpCard>
        </SignUpPageContainer>
      </div>
    )
  }

  return (
    <div className="content">
      <SignUpPageContainer>
        <SignUpCard body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label>電郵</Label>
              <Input
                type="text"
                name="email"
                maxLength={120}
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
              <FormText color="muted">
                我們將會驗證您的 Email，故請正確輸入。此外，這將是您登入時用的
                Email。
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label>密碼</Label>
              <Input
                type="password"
                name="password"
                innerRef={register({
                  required: '請輸入密碼',
                  minLength: {
                    value: 8,
                    message: '密碼太短了，請填一個更長的。',
                  },
                  maxLength: {
                    value: 24,
                    message: '密碼太長了，請填一個短一點的。',
                  },
                })}
                invalid={!!errors.password}
              />
              {errors.password && (
                <FormFeedback>{errors.password?.message}</FormFeedback>
              )}
              <FormText color="muted">
                8-24字元，可使用英文字母、數字、底線及符號。
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label>再次輸入密碼</Label>
              <Input
                type="password"
                name="confirmPassword"
                innerRef={register({
                  required: '請再次輸入密碼',
                  validate: (value) =>
                    value === watch('password') ||
                    '密碼不一致，請檢查後重新輸入',
                })}
                invalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <FormFeedback>{errors.confirmPassword?.message}</FormFeedback>
              )}
            </FormGroup>
            <div style={{ marginTop: 48 }}>
              <Button color="primary" type="submit" block isLoading={isLoading}>
                提交
              </Button>
            </div>
            {/* 
            <hr />

            <Center>
              <CardText>或者你可以選擇</CardText>
              <a href={getGoogleSignInLink()}>以 Google 帳號登入</a>
            </Center> */}

            <hr />

            <Center>
              <Button color="link" tag={Link} to="/sign-in">
                登入
              </Button>
            </Center>
          </Form>
        </SignUpCard>
      </SignUpPageContainer>
    </div>
  )
}

export default SignUp
