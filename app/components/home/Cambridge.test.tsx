import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Cambridge from './Cambridge'

test('shows the Cambridge shield and campus imagery', () => {
  render(<Cambridge />)
  expect(screen.getByAltText('Cambridge International shield')).toBeInTheDocument()
  expect(
    screen.getByAltText('Students at Seedling International Academy')
  ).toBeInTheDocument()
  expect(screen.getByAltText('Cambridge, United Kingdom')).toBeInTheDocument()
  expect(
    screen.getByAltText('Science laboratory at the Cambridge campus')
  ).toBeInTheDocument()
})

test('links to the Cambridge campus site', () => {
  render(<Cambridge />)
  expect(
    screen.getByRole('link', { name: /explore the cambridge campus/i })
  ).toHaveAttribute('href', 'https://seedling-international-academy.vercel.app')
})
