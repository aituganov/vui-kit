import type { App } from 'vue'
import { Mask, vMaska } from 'maska'
import './style.css'

export type VUIKitOpts = {
  pathToIcons: string;
}

import * as components from './components'
import type { Phone, PhoneAvailable } from './components/UiPhoneInut';

export let iconsPathPrefix: string;

export function installUiKit(app: App, opts: VUIKitOpts) {
  // Auto import all components
  iconsPathPrefix = opts.pathToIcons;
  app.directive('maska', vMaska)
  for (const componentKey in components) {
    app.component(componentKey, (components as any)[componentKey])
  }
}

export function prettyPhoneNumber(phone: Phone, availblePhones: PhoneAvailable[]): string {
  const variant = availblePhones.find(
    (elm: PhoneAvailable) => elm.code === phone.code
  )
  if (variant) {
    const mask = new Mask({ mask: variant.mask })
    return `${phone.code} ${mask.masked(phone.number)}`
  }
  return `${phone.code} ${phone.number}`
}
