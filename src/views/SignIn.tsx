import React from 'react'
import { useAsync } from 'react-async'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import { Card, FormGroup, Form, Input, Label, FormFeedback } from 'reactstrap'
import Button from '../components/Button'

import { getGoogleSignInLink } from '../services/api.service'
import authHelper from '../helpers/auth.helper'
import { Link, Redirect } from 'react-router-dom'
import { User } from '../types/user.type'
import Recaptcha from '../components/Recaptcha'

type FormData = {
  email: string
  password: string
}

const SignInPageContainer = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`
const SignInCard = styled(Card)`
  width: 400px;
  max-width: 100%;
  margin-top: 60px;
`
const Center = styled.div`
  text-align: center;
`
const signInFn = async ([{ identifier, password }]: any) => {
  return authHelper.signIn(identifier, password)
}

const SignIn = () => {
  const { register, handleSubmit, errors, setError } = useForm<FormData>()
  const signInAsync = useAsync<{ jwt: string; user: User }>({
    deferFn: signInFn,
    onReject: () => {
      setError('email', {
        message: '電郵或密碼錯誤，請檢查後再試一次。',
      })
    },
  })

  const onSubmit = (data: FormData) => {
    signInAsync.run({
      identifier: data.email,
      password: data.password,
    })
  }

  if (signInAsync.data) {
    return <Redirect to="/student" />
  }

  return (
    <div className="content">
      <SignInPageContainer>
        <SignInCard body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
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
            <FormGroup>
              <Label>密碼</Label>
              <Input
                type="password"
                name="password"
                innerRef={register({
                  required: '請輸入密碼',
                })}
                invalid={!!errors.password}
              />
              {errors.password && (
                <FormFeedback>{errors.password?.message}</FormFeedback>
              )}
            </FormGroup>

            <div style={{ marginTop: 48 }}>
              <Recaptcha />
              <Button
                color="primary"
                type="submit"
                block
                isLoading={signInAsync.isLoading}
              >
                登入
              </Button>
            </div>
            <Center>
              <Button color="link" tag={Link} to="/forgot-password">
                忘記密碼
              </Button>
            </Center>

            {/* <hr />

            <a href={getGoogleSignInLink()}>以 Google 帳號登入</a> */}

            <hr />

            <Center>
              <Button color="link" tag={Link} to="/sign-up">
                註冊
              </Button>
            </Center>
          </Form>
        </SignInCard>
      </SignInPageContainer>
    </div>
  )
}

export default SignIn
