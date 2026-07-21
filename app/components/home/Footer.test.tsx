import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

test('renders links to each property and a copyright line', () => {
  render(<Footer />)
  expect(screen.getByRole('link', { name: /^sps$/i })).toHaveAttribute(
    'href',
    'https://sps.seedlingschools.com'
  )
  expect(screen.getByRole('link', { name: /^smhs$/i })).toHaveAttribute(
    'href',
    'https://smhs.seedlingschools.com'
  )
  expect(screen.getByRole('link', { name: /cambridge/i })).toHaveAttribute(
    'href',
    'https://seedling-international-academy.vercel.app'
  )
  expect(screen.getByRole('link', { name: /alumni/i })).toHaveAttribute(
    'href',
    'https://seedlingschools.com/alumni.php'
  )
  expect(screen.getByRole('link', { name: /about us/i })).toHaveAttribute(
    'href',
    'https://seedlingschools.com/about-us.php'
  )
  expect(screen.getByText(/seedling group of schools/i)).toBeInTheDocument()
})
