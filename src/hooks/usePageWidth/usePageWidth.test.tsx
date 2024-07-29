// import React from 'react'
import { act, render } from '@testing-library/react'
import usePageWidth from './usePageWidth'

let dimensions: {
  device: any
  size: any
  width: any
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}
function TestComponent({ width }: { width: number }) {
  act(() => {
    window.innerWidth = width
  })
  const { useDimensions } = usePageWidth()
  dimensions = useDimensions()
  return <div>Testing Component Body</div>
}

describe('Verify the device "name" found with different screen widths', () => {
  it('430px or less should be mobile', () => {
    render(<TestComponent width={430} />)
    expect(dimensions.device).toBe('mobile')
    expect(dimensions.isMobile).toBe(true)
  })
  it('1024px or less should be tablet', () => {
    render(<TestComponent width={1024} />)
    expect(dimensions.device).toBe('tablet')
    expect(dimensions.isTablet).toBe(true)
  })
  it('1025 and above should be desktop', () => {
    render(<TestComponent width={1025} />)
    expect(dimensions.device).toBe('desktop')
    expect(dimensions.isDesktop).toBe(true)
  })
})
