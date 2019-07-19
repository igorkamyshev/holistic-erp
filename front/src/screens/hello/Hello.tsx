import React from 'react'
import { observer } from 'mobx-react'
import { store } from '&front/store'
import { Loader } from '&front/ui/loader'

export const Hello = observer(() => {
  if (store.userStore.primaryAgencyExists) {
    return <Loader />
  }

  return <p>privet</p>
})
