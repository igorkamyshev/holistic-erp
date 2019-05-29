import { createSvelteStore } from '@storeon/svelte'
import persistState from '@storeon/localstorage'

import devtools from 'storeon/devtools'

import { user } from './user'
import { common } from './common'

export const connect = createSvelteStore([
  user,
  common,
  persistState(['user']),
  process.env.NODE_ENV !== 'production' && devtools,
])
