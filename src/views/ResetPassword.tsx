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
  Alert,
} from 'reactstrap'
import Button from '../components/Button'

import authHelper from '../helpers/auth.helper'
import { Link, useLocation } from 'react-router-dom'

type FormData = {
  password: string
  confirmPassword: string
}

const ResetPasswordPageContainer = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`
const ResetPasswordCard = styled(Card)`
  width: 400px;
  max-width: 100%;
  margin-top: 60px;
`

const ResetPassword = () => {
  const location = useLocation<{ code: string }>()
  const query = new URLSearchParams(location.search)

  const { register, handleSubmit, errors, setError, watch } = useForm<
    FormData
  >()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isResetPasswordSuccess, setIsResetPasswordSuccess] = useState<boolean>(
    false
  )

  const onSubmit = (data: FormData) => {
    setIsResetPasswordSuccess(false)
    setIsLoading(true)

    authHelper
      .resetPassword(
        query.get('code') as string,
        data.password,
        data.confirmPassword
      )
      .then(() => {
        setIsResetPasswordSuccess(true)
      })
      .catch((e) => {
        console.log(e.response)
        switch (e.response?.status) {
          default: {
            setError('password', {
              message: '失敗: 未知的錯誤',
            })
          }
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  if (!query.has('code')) {
    return (
      <div className="content">
        <ResetPasswordPageContainer>
          <ResetPasswordCard body className="text-center">
            <Alert color="danger" className="text-center">
              無效的動作。
            </Alert>

            <hr />

            <Button color="link" tag={Link} to="/auth/sign-in">
              登入
            </Button>
          </ResetPasswordCard>
        </ResetPasswordPageContainer>
      </div>
    )
  }

  if (isResetPasswordSuccess) {
    return (
      <div className="content">
        <ResetPasswordPageContainer>
          <ResetPasswordCard body className="text-center">
            <CardText>密碼已重置，請使用新密碼登入。</CardText>

            <hr />

            <Button color="link" tag={Link} to="/auth/sign-in">
              登入
            </Button>
          </ResetPasswordCard>
        </ResetPasswordPageContainer>
      </div>
    )
  }

  return (
    <div className="content">
      <ResetPasswordPageContainer>
        <ResetPasswordCard body>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
          </Form>
        </ResetPasswordCard>
      </ResetPasswordPageContainer>
    </div>
  )
}

export default ResetPassword
