import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Principal from './Principal'

test('names Dr. Preeti Bakshi with her portrait', () => {
  render(<Principal />)
  expect(
    screen.getByRole('heading', { name: 'Dr. Preeti Bakshi' })
  ).toBeInTheDocument()
  expect(screen.getByAltText('Dr. Preeti Bakshi')).toBeInTheDocument()
})

test('lists her principalship of both CBSE schools', () => {
  const { container } = render(<Principal />)
  const roles = Array.from(container.querySelectorAll('dt')).map(
    (dt) => dt.textContent
  )
  const schools = Array.from(container.querySelectorAll('dd')).map(
    (dd) => dd.textContent
  )
  expect(roles).toEqual(['Principal', 'Principal'])
  expect(schools).toEqual([
    'Seedling Public School',
    'Seedling Modern High School',
  ])
})
