import React, { useCallback } from 'react'
import { Form, Field } from 'react-final-form'
import cx from 'classnames'

import { LoginPasswordCredentials } from '&shared/model/LoginPasswordCredentials'
import { StylingProps } from '&front/utils/StylingProps'
import { store } from '&front/store'

import s from './LoginPassword.css'
import { Label } from '&front/ui/label'

export const LoginPassword = ({ className }: StylingProps) => {
  const onSubmit = useCallback(async (fields: LoginPasswordCredentials) => {
    await store.userStore.internalSignIn(fields)
  }, [])

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={cx(className, s.container)}>
          <Label text="Email">
            <Field name="login" component="input" type="email" />
          </Label>

          <Label text="Пароль">
            <Field name="password" component="input" type="password" />
          </Label>

          <button>Войти</button>
        </form>
      )}
    </Form>
  )
}
