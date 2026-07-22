import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Nav from './Nav'

test('links to all three schools and the alumni page', () => {
  render(<Nav />)
  expect(screen.getByRole('link', { name: /^sps$/i })).toHaveAttribute(
    'href',
    'https://sps.seedlingschools.com'
  )
  expect(screen.getByRole('link', { name: /^smhs$/i })).toHaveAttribute(
    'href',
    'https://smhs.seedlingschools.com'
  )
  expect(screen.getByRole('link', { name: /^cambridge$/i })).toHaveAttribute(
    'href',
    'https://seedling-international-academy.vercel.app'
  )
  expect(screen.getByRole('link', { name: /^alumni$/i })).toHaveAttribute(
    'href',
    'https://seedlingschools.com/alumni.php'
  )
})

test('outbound links carry noopener noreferrer', () => {
  render(<Nav />)
  for (const name of [/^sps$/i, /^smhs$/i, /^cambridge$/i, /^alumni$/i]) {
    const link = screen.getByRole('link', { name })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  }
})

test('links to each on-page section', () => {
  render(<Nav />)
  expect(screen.getByRole('link', { name: /the journey/i })).toHaveAttribute('href', '#journey')
  expect(screen.getByRole('link', { name: /our schools/i })).toHaveAttribute('href', '#schools')
  expect(screen.getByRole('link', { name: /leadership/i })).toHaveAttribute('href', '#leadership')
})
