import { useState, useEffect } from 'react'

type Device = 'mobile' | 'tablet' | 'desktop'
type Size = 'small' | 'medium' | 'large'
type PageWidthSizes = {
  /** 360×800 and below */
  'mobile-small'?: any
  /** 390x844 and below */
  'mobile-medium'?: any
  /** 430×932 and below */
  'mobile-large'?: any
  /** 601×962 and below */
  'tablet-small'?: any
  /** 768×1024 and below */
  'tablet-medium'?: any
  /** 1024×768 and below */
  'tablet-large'?: any
  /** 1280×720 and below */
  'desktop-small'?: any
  /** 1366×768 and below */
  'desktop-medium'?: any
  /** 1920×1080 and above (use as default) */
  'desktop-large'?: any
}
type PageDimensions = {
  device: Device
  size: Size
  width: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

/** Hook for handling `component rendering` in different screen sizes */
export default function usePageWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const getDevice = (): Device => {
    if (windowWidth <= 430) {
      return 'mobile'
    }
    if (windowWidth <= 1024) {
      return 'tablet'
    }
    if (windowWidth >= 1025) {
      return 'desktop'
    }
    throw new Error('Page width is not of type number.')
  }
  const getSize = (): Size => {
    const device = getDevice()
    if (device === 'mobile') {
      if (windowWidth <= 360) {
        return 'small'
      }
      if (windowWidth <= 390) {
        return 'medium'
      }
      if (windowWidth <= 430) {
        return 'large'
      }
    }
    if (device === 'tablet') {
      if (windowWidth <= 601) {
        return 'small'
      }
      if (windowWidth <= 768) {
        return 'medium'
      }
      if (windowWidth <= 1024) {
        return 'large'
      }
    }
    if (device === 'desktop') {
      if (windowWidth <= 1280) {
        return 'small'
      }
      if (windowWidth <= 1366) {
        return 'medium'
      }
      if (windowWidth >= 1367) {
        return 'large'
      }
    }
    throw new Error('Page width, cannot determine size')
  }
  const getWidth = (): number => {
    return windowWidth
  }
  const isDevice = (device: Device): boolean => {
    const currentDevice = getDevice()
    if (currentDevice === device) {
      return true
    }
    return false
  }

  /** Returns the dimensions of the page, for stateful management  */
  const useDimensions = (): PageDimensions => {
    return {
      device: getDevice(),
      size: getSize(),
      width: getWidth(),
      isDesktop: isDevice('desktop'),
      isTablet: isDevice('tablet'),
      isMobile: isDevice('mobile'),
    }
  }

  /** Returns a `value` or `undefined` based of page width size */
  const useDefaults = (pageWidthSizes: PageWidthSizes) => {
    const device = getDevice()
    const size = getSize()
    const isLargeRange = size === 'large' || size === 'medium' || size === 'small'
    const isMediumRange = size === 'medium' || size === 'small'
    const isSmallRange = size === 'small'
    if (device === 'mobile') {
      if (pageWidthSizes['mobile-small'] && isSmallRange) {
        return pageWidthSizes['mobile-small']
      }
      if (pageWidthSizes['mobile-medium'] && isMediumRange) {
        return pageWidthSizes['mobile-medium']
      }
      if (pageWidthSizes['mobile-large'] && isLargeRange) {
        return pageWidthSizes['mobile-large']
      }
    }
    if (device === 'tablet' || device === 'mobile') {
      if (device === 'tablet') {
        if (pageWidthSizes['tablet-small'] && isSmallRange) {
          return pageWidthSizes['tablet-small']
        }
        if (pageWidthSizes['tablet-medium'] && isMediumRange) {
          return pageWidthSizes['tablet-medium']
        }
        if (pageWidthSizes['tablet-large'] && isLargeRange) {
          return pageWidthSizes['tablet-large']
        }
      } else {
        if (pageWidthSizes['tablet-small']) {
          return pageWidthSizes['tablet-small']
        }
        if (pageWidthSizes['tablet-medium']) {
          return pageWidthSizes['tablet-medium']
        }
        if (pageWidthSizes['tablet-large']) {
          return pageWidthSizes['tablet-large']
        }
      }
    }
    if (device === 'desktop' || device === 'tablet' || device === 'mobile') {
      if (device === 'desktop') {
        if (pageWidthSizes['desktop-small'] && isSmallRange) {
          return pageWidthSizes['desktop-small']
        }
        if (pageWidthSizes['desktop-medium'] && isMediumRange) {
          return pageWidthSizes['desktop-medium']
        }
        if (pageWidthSizes['desktop-large'] && isLargeRange) {
          return pageWidthSizes['desktop-large']
        }
      } else {
        if (pageWidthSizes['desktop-small']) {
          return pageWidthSizes['desktop-small']
        }
        if (pageWidthSizes['desktop-medium']) {
          return pageWidthSizes['desktop-medium']
        }
        if (pageWidthSizes['desktop-large']) {
          return pageWidthSizes['desktop-large']
        }
      }
    }
  }

  return { useDimensions, useDefaults }
}
