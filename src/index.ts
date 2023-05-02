import type { App } from 'vue'

import * as components from './components'

const VUIKit = {
  install(app: App) {
    // Auto import all components
    for (const componentKey in components) {
        app.use((components as any)[componentKey])
    }
  }
}

export default VUIKit