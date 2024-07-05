import './header.module.css'
import logo from './logo-1.png'

function Logo() {
  return <img src={logo} alt="doyed-header-logo"></img>
}
function Links() {
  return (
    <nav role="navigation" aria-label="Main Navigation">
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  )
}

type HeaderProps = {
  /** `Default` is false */
  sticky?: boolean
  /** `Default` is false */
  fullWidth?: boolean
}

export default function Header(props: HeaderProps) {
  // const isSticky = props.sticky === true
  const isFullWidth = props.fullWidth === true
  return (
    <header role="banner" style={{ maxWidth: isFullWidth ? '100%' : '1500px' }}>
      <div className="container">
        <Logo />
        <Links />
      </div>
    </header>
  )
}
