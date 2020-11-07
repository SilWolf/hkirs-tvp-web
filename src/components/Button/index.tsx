import React from 'react'
import { Button as RSButton, ButtonProps, Spinner } from 'reactstrap'

type Props = ButtonProps & {
  isLoading?: boolean
}

const Button = ({ isLoading, children, ...props }: Props) => {
  if (isLoading) {
    return (
      <RSButton disabled {...props}>
        <Spinner size="sm" type="grow" color="light" />
      </RSButton>
    )
  }

  return <RSButton {...props}>{children}</RSButton>
}

export default Button
