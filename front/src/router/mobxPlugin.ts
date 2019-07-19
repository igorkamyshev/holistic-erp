import { Router, PluginFactory, State } from 'router5'

import { ApplicationStore } from '&front/store/ApplicationStore'

export function mobxPlugin(store: ApplicationStore): PluginFactory {
  function plugin(router: Router | undefined) {
    if (!router) {
      return {}
    }

    router.setDependency('store', store)

    const { routerStore } = store

    routerStore.setRouter(router)

    return {
      onTransitionSuccess(toState: State) {
        routerStore.onTransitionSuccess(toState)
      },
    }
  }

  plugin.pluginName = 'MOBX_PLUGIN'

  return plugin
}
