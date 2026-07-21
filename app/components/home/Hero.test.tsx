import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

test('renders the headline and three school CTAs', () => {
  render(<Hero />)
  expect(
    screen.getByRole('heading', { level: 1, name: /the journey from nursery to university/i })
  ).toBeInTheDocument()
  expect(screen.getAllByRole('link')).toHaveLength(3)
})
