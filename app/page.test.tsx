import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './page'

test('renders the group homepage headline', () => {
  render(<Page />)
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /from nursery to class xii\s+and beyond/i,
    })
  ).toBeInTheDocument()
})

test('renders the brief’s sections in order', () => {
  render(<Page />)
  const sections = screen
    .getAllByRole('heading', { level: 2 })
    .map((heading) => heading.textContent)

  expect(sections).toEqual([
    'Four schools, two boards, two Jaipur campuses.',
    'A connected school journey, from early learning through graduation.',
    'Dr. Sandeep Bakshi',
    'Dr. Preeti Bakshi',
    'The Pride of Seedling',
    'Not sure which campus fits?',
  ])
})

test('renders the navigation and footer', () => {
  render(<Page />)
  expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0)
  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
})
