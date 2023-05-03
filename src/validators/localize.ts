import { configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'

configure({
  // Generates an English message locale generator
  generateMessage: localize('ru', {
    messages: {
      password: 'не менее 6 символов',
      required: 'Необходимо заполнить'
    }
  })
})

setLocale('ru')