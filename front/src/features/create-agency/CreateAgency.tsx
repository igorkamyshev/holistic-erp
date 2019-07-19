import React, { useCallback, useState } from 'react'
import { Form, Field } from 'react-final-form'

import { Label } from '&front/ui/label'
import { StylingProps } from '&front/utils/StylingProps'
import { CreateAgency as CreateAgencyRequest } from '&shared/model/CreateAgency'
import { store } from '&front/store'

interface Props {
  onCreated: () => void
}

export const CreateAgency = ({
  className,
  onCreated,
}: Props & StylingProps) => {
  const [token, setToken] = useState<string | null>(null)

  const { agencyStore } = store

  const onSubmit = useCallback(async (fields: CreateAgencyRequest) => {
    const geneatedToken = await agencyStore.createAgency(fields)

    setToken(geneatedToken)
    onCreated()
  }, [])

  return (
    <section className={className}>
      <h2>Новое агенство</h2>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Label text="Название">
              <Field name="name" component="input" />
            </Label>

            <button>Создать</button>
          </form>
        )}
      </Form>

      {token}
    </section>
  )
}
