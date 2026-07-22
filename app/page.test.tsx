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

test('renders all homepage sections', () => {
  render(<Page />)
  expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0)
  expect(screen.getByRole('heading', { name: /a child joins us at three/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /three campuses, two boards/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /six commitments/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /our mission/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /our leadership/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /the pride of seedling/i })).toBeInTheDocument()
  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
})
