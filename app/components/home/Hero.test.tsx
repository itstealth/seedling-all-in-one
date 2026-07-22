import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

test('renders the headline and the founding year', () => {
  render(<Hero />)
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /the journey from nursery\s+to university/i,
    })
  ).toBeInTheDocument()
  expect(screen.getByText(/established 1992/i)).toBeInTheDocument()
})

test('renders the group statistics', () => {
  render(<Hero />)
  expect(screen.getByText('20,000+')).toBeInTheDocument()
  expect(screen.getByText('15:1')).toBeInTheDocument()
  expect(screen.getByText('5,000+')).toBeInTheDocument()
  expect(screen.getByText('50+')).toBeInTheDocument()
})
