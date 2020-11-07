import React from 'react'
import styled from 'styled-components'

import { Button, Card, FormGroup, Form, Input, Label } from 'reactstrap'
import { getGoogleLoginLink } from '../services/api.service'

const LoginPageContainer = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`
const LoginCard = styled(Card)`
  width: 400px;
  max-width: 100%;
  margin-top: 60px;
`
const Center = styled.div`
  text-align: center;
`

const Login = () => {
  return (
    <div className="content">
      <LoginPageContainer>
        <LoginCard body>
          <Form>
            <FormGroup>
              <Label>電郵</Label>
              <Input type="email" name="email" />
            </FormGroup>
            <FormGroup>
              <Label>密碼</Label>
              <Input type="password" name="password" password />
            </FormGroup>
            <Button color="primary" block>
              登入
            </Button>
            <Center>
              <Button color="link">忘記密碼</Button>
            </Center>

            <hr />

            <a href={getGoogleLoginLink()}>以 Google 帳號登入</a>

            <hr />

            <Center>
              <Button color="link">註冊</Button>
            </Center>
          </Form>
        </LoginCard>
      </LoginPageContainer>
    </div>
  )
}

export default Login
