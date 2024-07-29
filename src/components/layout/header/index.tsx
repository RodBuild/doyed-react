import usePageWidth from '../../../hooks/usePageWidth/usePageWidth'
import { ThemeContext } from '../../../hooks/context/ThemeContext'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './header.module.css'
import { useState, useContext } from 'react'
import logo from './logo-1.png'

const MAX_WIDTH = 1500
type Theme = 'light' | 'dark'

/** The header links */
function NavigationLinks({
  theme,
  isOverlay,
  toggleOverlay,
}: {
  theme: Theme
  isOverlay?: boolean
  toggleOverlay?: any
}) {
  const fontColorStyle = { color: theme === 'dark' ? 'white' : 'black' }
  const isMobileOverlay = isOverlay === true
  const CloseButton = () => {
    return (
      <li>
        <button onClick={toggleOverlay}>X</button>
      </li>
    )
  }
  return (
    <ul className={style.navigationLinksContainer}>
      {isMobileOverlay && <CloseButton />}
      <li>
        <a style={fontColorStyle} href="/services">
          Services
        </a>
      </li>
      <li>
        <a style={fontColorStyle} href="/about">
          About
        </a>
      </li>
      <li>
        <a style={fontColorStyle} href="/estimate">
          Estimate
        </a>
      </li>
      <li>
        <a style={fontColorStyle} href="/contact">
          Contact Us
        </a>
      </li>
    </ul>
  )
}
/** Overlay that opens and closes with hamburger menu */
function MobileMenuOverlay({
  theme,
  useDimensions,
  overlayIsOpen,
  toggleOverlay,
}: {
  theme: Theme
  useDimensions: any
  overlayIsOpen: boolean
  toggleOverlay: any
}) {
  const dimensions = useDimensions()

  return (
    <div
      className={style.overlayContainer}
      style={{
        visibility: overlayIsOpen ? 'visible' : 'hidden',
        width: dimensions.width <= 300 ? '100%' : '60%',
        backgroundColor: theme === 'dark' ? 'black' : 'white',
      }}
    >
      <NavigationLinks theme={theme} isOverlay toggleOverlay={toggleOverlay} />
    </div>
  )
}
function Logo() {
  return (
    <div className={style.imageContainer}>
      <img className={style.imageStyle} loading="eager" src={logo} alt="doyed-header-logo"></img>
    </div>
  )
}
function ThemeButton({ theme, toggleTheme }: { theme: Theme; toggleTheme: () => void }) {
  return <button onClick={toggleTheme}>change theme</button>
}
function Links({ theme, useDefaults, toggleOverlay }: { theme: Theme; useDefaults: any; toggleOverlay: any }) {
  const MobileLayout = () => {
    // const Overlay = () => {
    //   return overlayIsOpen && <div className="mobileOverlay">overlay</div>
    // }

    return (
      <>
        <button onClick={toggleOverlay}>Toggle Overlay</button>
      </>
      // <button
      // onClick={() => {
      //   if (!overlayIsOpen) {
      //     setOverlayIsOpen(true)
      //   }
      //   setOverlayIsOpen(false)
      // }}
      // >
      //   Open Overlay
      // </button>
    )
  }
  const DesktopLayout = () => {
    return (
      // <ul className={style.linksDesktopLayout}>
      <NavigationLinks theme={theme} />
      // </ul>
    )
  }

  return (
    <nav className={style.linksContainer} role="navigation" aria-label="Main Navigation">
      {useDefaults({
        'desktop-large': <DesktopLayout />,
        // 'tablet-large': <MobileLayout />,
        'tablet-medium': <MobileLayout />,
        // 'mobile-small': <>Mobile Small</>,
        // 'tablet-medium': <>mediumm</>,
        // 'desktop-medium': <>desktop largee</>,
      })}
    </nav>
  )
}
// function searchBar() {
//   // return <></>
// }

type HeaderProps = {
  /** `Default` is false */
  sticky?: boolean
  /** `Default` is false */
  fullWidth?: boolean
}

export default function Header(props: HeaderProps) {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [ovelayIsOpen, setOverlayIsOpen] = useState(false)
  console.log(ovelayIsOpen)
  const toggleOverlay = () => {
    setOverlayIsOpen(!ovelayIsOpen ? true : false)
  }
  const { useDefaults, useDimensions } = usePageWidth()
  console.log(useDimensions())
  // const isSticky = props.sticky === true
  const isFullWidth = props.fullWidth === true
  return (
    <header role="banner" style={{ maxWidth: isFullWidth ? '100%' : MAX_WIDTH }}>
      <div className={style.headerContentContainer}>
        <MobileMenuOverlay
          theme={theme}
          useDimensions={useDimensions}
          overlayIsOpen={ovelayIsOpen}
          toggleOverlay={toggleOverlay}
        />
        {/* <Logo /> */}
        <p>Logo Here</p>
        <ThemeButton theme={theme} toggleTheme={toggleTheme} />
        <Links theme={theme} useDefaults={useDefaults} toggleOverlay={toggleOverlay} />
      </div>
    </header>
  )
}
