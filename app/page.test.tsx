import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './page'

test('renders the group homepage headline', () => {
  render(<Page />)
  expect(
    screen.getByRole('heading', { name: /the journey from nursery to university/i })
  ).toBeInTheDocument()
})

test('renders all homepage sections', () => {
  render(<Page />)
  expect(screen.getByRole('navigation')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /our leadership/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /the pride of seedling/i })).toBeInTheDocument()
  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
})
