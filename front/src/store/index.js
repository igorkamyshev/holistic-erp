import { createSvelteStore } from '@storeon/svelte'
import persistState from '@storeon/localstorage'

import { user } from './user'

export const connect = createSvelteStore([user, persistState(['user'])])
