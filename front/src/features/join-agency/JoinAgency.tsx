import React, { useCallback } from 'react'
import { Form, Field } from 'react-final-form'

import { store } from '&front/store'
import { JoinAgency as JoinAgencyRequest } from '&shared/model/JoinAgency'
import { StylingProps } from '&front/utils/StylingProps'
import { Label } from '&front/ui/label'

interface Props {
  onJoin: () => void
}

export const JoinAgency = ({ onJoin, className }: Props & StylingProps) => {
  const { agencyStore } = store

  const onSubmit = useCallback(async (fields: JoinAgencyRequest) => {
    await agencyStore.joinAgency(fields)

    onJoin()
  }, [])

  return (
    <section className={className}>
      <h2>Членство</h2>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Label text="Название">
              <Field name="name" component="input" />
            </Label>

            <Label text="Токен">
              <Field name="token" component="input" />
            </Label>

            <button>Вcтупить</button>
          </form>
        )}
      </Form>
    </section>
  )
}
