import React, { useCallback } from 'react'
import { Form, Field } from 'react-final-form'

import { LoginPasswordCredentials } from '&shared/model/LoginPasswordCredentials'
import { store } from '&front/store'

export const LoginPassword = () => {
  const onSubmit = useCallback(async (fields: LoginPasswordCredentials) => {
    await store.userStore.internalSignIn(fields)
  }, [])

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <Field name="login" component="input" type="email" />
          </label>

          <label>
            Пароль
            <Field name="password" component="input" type="password" />
          </label>

          <button>Войти</button>
        </form>
      )}
    </Form>
  )
}
