import { defineRule } from 'vee-validate'
import { confirmed, required, email, length } from '@vee-validate/rules'
import { password } from './password'

defineRule('confirmed', confirmed)
defineRule('required', required)
defineRule('email', email)
defineRule('length', length)
defineRule('password', password)

import './localize'