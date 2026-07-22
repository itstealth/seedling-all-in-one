import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import SchoolsShowcase from './SchoolsShowcase'

test('renders a card with logo and link for each school', () => {
  render(<SchoolsShowcase />)
  expect(screen.getByAltText('SPS logo')).toBeInTheDocument()
  expect(screen.getByAltText('SMHS logo')).toBeInTheDocument()
  expect(screen.getByAltText('Cambridge shield logo')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /visit sps/i })).toHaveAttribute(
    'href',
    'https://sps.seedlingschools.com'
  )
  expect(screen.getByRole('link', { name: /visit smhs/i })).toHaveAttribute(
    'href',
    'https://smhs.seedlingschools.com'
  )
  expect(screen.getByRole('link', { name: /visit cambridge/i })).toHaveAttribute(
    'href',
    'https://seedling-international-academy.vercel.app'
  )
})

test('labels each school with its examination board', () => {
  render(<SchoolsShowcase />)
  expect(screen.getAllByText('CBSE')).toHaveLength(2)
  expect(screen.getByText('Cambridge')).toBeInTheDocument()
})
