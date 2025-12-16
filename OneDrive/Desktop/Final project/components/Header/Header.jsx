import './Header.css'
import Navigation from '../Navigation/Navigation'

function Header({
  isAuthenticated,
  userName,
  onLoginClick,
  onRegisterClick,
  onLogout,
}) {
  return (
    <header className="header">
      <Navigation
        isAuthenticated={isAuthenticated}
        userName={userName}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogout={onLogout}
      />
    </header>
  )
}

export default Header
