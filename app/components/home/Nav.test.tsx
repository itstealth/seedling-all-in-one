import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Nav from './Nav'

test('links to all three schools and the alumni page', () => {
  render(<Nav />)
  expect(screen.getByRole('link', { name: /sps/i })).toHaveAttribute(
    'href',
    'https://sps.seedlingschools.com'
  )
  expect(screen.getByRole('link', { name: /smhs/i })).toHaveAttribute(
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
})
