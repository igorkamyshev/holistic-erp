import { Router, PluginFactory, State, NavigationOptions } from 'router5'

import { RouterStore } from './RouterStore'

export function mobxPlugin(routerStore: RouterStore): PluginFactory {
  function plugin(router: Router | undefined) {
    if (!router) {
      return {}
    }

    router.setDependency('routerStore', routerStore)
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
