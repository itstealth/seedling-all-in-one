import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './page'

test('renders the group homepage headline', () => {
  render(<Page />)
  expect(
    screen.getByRole('heading', { name: /the journey from nursery to university/i })
  ).toBeInTheDocument()
})
