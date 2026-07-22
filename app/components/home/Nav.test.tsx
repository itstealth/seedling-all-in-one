import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Nav from './Nav'

test('the group switcher links to every school by name', () => {
  render(<Nav />)
  expect(
    screen.getByRole('link', { name: 'Seedling Public School' })
  ).toHaveAttribute('href', 'https://sps.seedlingschools.com')
  expect(
    screen.getByRole('link', { name: 'Seedling Modern High School' })
  ).toHaveAttribute('href', 'https://smhs.seedlingschools.com')
  expect(screen.getByRole('link', { name: 'Cambridge shield' })).toHaveAttribute(
    'href',
    'https://seedling-international-academy.vercel.app'
  )
})

test('the group switcher shows each school logo', () => {
  const { container } = render(<Nav />)
  const logos = Array.from(container.querySelectorAll('img')).map(
    (img) => img.getAttribute('src') ?? ''
  )
  expect(logos.some((src) => src.includes('sps-logo'))).toBe(true)
  expect(logos.some((src) => src.includes('smhs-logo'))).toBe(true)
  expect(logos.some((src) => src.includes('cambridge-shield'))).toBe(true)
})

test('links to the alumni page', () => {
  render(<Nav />)
  expect(screen.getByRole('link', { name: /^alumni$/i })).toHaveAttribute(
    'href',
    'https://seedlingschools.com/alumni.php'
  )
})

test('outbound links carry noopener noreferrer', () => {
  render(<Nav />)
  const outbound = screen
    .getAllByRole('link')
    .filter((link) => link.getAttribute('href')?.startsWith('http'))
  expect(outbound).toHaveLength(4)
  for (const link of outbound) {
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  }
})

test('links to each on-page section', () => {
  render(<Nav />)
  expect(screen.getByRole('link', { name: /the journey/i })).toHaveAttribute('href', '#journey')
  expect(screen.getByRole('link', { name: /our schools/i })).toHaveAttribute('href', '#schools')
  expect(screen.getByRole('link', { name: /leadership/i })).toHaveAttribute('href', '#leadership')
  expect(screen.getByRole('link', { name: /choose a school/i })).toHaveAttribute('href', '#schools')
})
