import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Leadership from './Leadership'

test('renders the directors with their exact designations', () => {
  render(<Leadership />)
  expect(screen.getByText('Dr. Sandeep Bakshi')).toBeInTheDocument()
  expect(screen.getByText('CEO & Director, Seedling Group of Institutions')).toBeInTheDocument()
  expect(screen.getByText('Dr. Preeti Bakshi')).toBeInTheDocument()
  expect(screen.getByText('Executive Director, Seedling Group of Institutions')).toBeInTheDocument()
})

test('renders all five torchbearers with photos', () => {
  render(<Leadership />)
  expect(screen.getByText('Late Ms. Mohini Bakshi')).toBeInTheDocument()
  expect(screen.getByText('Ms. Akansha Bakshi')).toBeInTheDocument()
  expect(screen.getByText('Ms. Aishwarya Bakshi')).toBeInTheDocument()
  expect(screen.getAllByRole('img')).toHaveLength(5)
})
