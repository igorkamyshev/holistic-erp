import { createSvelteStore } from '@storeon/svelte'
import persistState from '@storeon/localstorage'

import devtools from 'storeon/devtools'

import { user } from './user'
import { common } from './common'
import { team } from './team'

export const connect = createSvelteStore([
  user,
  common,
  team,
  persistState(['user']),
  process.env.NODE_ENV !== 'production' && devtools,
])
