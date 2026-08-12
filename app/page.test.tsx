import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './page'

test('renders the group homepage headline', () => {
  render(<Page />)
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /the journey from nursery\s+to university/i,
    })
  ).toBeInTheDocument()
})

test('renders the brief’s sections in order', () => {
  render(<Page />)
  const sections = screen
    .getAllByRole('heading', { level: 2 })
    .map((heading) => heading.textContent)

  expect(sections).toEqual([
    'Three campuses, two boards, one standard.',
    'A child joins us at three. We are still here at eighteen.',
    'Dr. Sandeep Bakshi',
    'Dr. Preeti Bakshi',
    'The Pride of Seedling',
    'Every route starts with a conversation.',
  ])
})

test('renders the navigation and footer', () => {
  render(<Page />)
  expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0)
  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
})
