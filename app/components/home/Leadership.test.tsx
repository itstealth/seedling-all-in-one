import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Leadership from './Leadership'

test('renders both leaders with their designations', () => {
  render(<Leadership />)
  expect(screen.getByText('Dr. Sandeep Bakshi')).toBeInTheDocument()
  expect(screen.getByText('CEO & Director, Seedling Group of Institutions')).toBeInTheDocument()
  expect(screen.getByText('Dr. Preeti Bakshi')).toBeInTheDocument()
  expect(screen.getByText('Executive Director, Seedling Group of Institutions')).toBeInTheDocument()
})
