import type { App } from 'vue'

import * as components from './components'

export function installUiKit(app: App) {
  // Auto import all components
  for (const componentKey in components) {
    app.component(componentKey, (components as any)[componentKey])
  }
}