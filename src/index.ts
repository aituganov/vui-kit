import type { App } from 'vue'

import * as components from './components'

export function installUiKit(app: App) {
  // Auto import all components
  for (const componentKey in components) {
    console.error('!!!', componentKey, components)
    app.component(componentKey, (components as any)[componentKey])
  }
}
export type * from './components'