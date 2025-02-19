import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import GameKeyboard from '../../Game/GameKeyboard.vue'

describe('GameKeyboard', () => {
  it('renders all 26 letters and 2 control buttons', () => {
    const wrapper = mount(GameKeyboard)
    expect(wrapper.findAllComponents({ name: 'button' }).length).toBe(28)
  })
})
