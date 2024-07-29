import usePageWidth from '../../../hooks/usePageWidth/usePageWidth'
import { ThemeContext } from '../../../hooks/context/ThemeContext'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './header.module.css'
import { useState, useContext } from 'react'
// import logo from './logo-1.png'

const MAX_WIDTH = 1500

function MobileHeader() {
  return (
    <div className={style.overlay}>
      <p>Oerlay</p>
    </div>
  )
}
function DesktopHeader() {
  return <div>Stuff</div>
}

type HeaderProps = {
  /** `Default` is false */
  sticky?: boolean
  /** `Default` is false */
  fullWidth?: boolean
}

export default function Header(props: HeaderProps) {
  const isFullWidth = props.fullWidth === true
  const isSticky = props.sticky === true
  const { useDefaults } = usePageWidth()
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [ovelayIsOpen, setOverlayIsOpen] = useState(false)
  // const isMobile =

  return (
    <header role="banner" style={{ width: isFullWidth ? '100%' : MAX_WIDTH }}>
      <div className={style.headerContentContainer}>
        {useDefaults({ 'desktop-large': <DesktopHeader />, 'tablet-medium': <MobileHeader /> })}
      </div>
    </header>
  )
}
