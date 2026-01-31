import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {currentYear} Market & News Explorer, Powered by News API and Finnhub
      </p>
      <nav className="footer__nav">
        <a href="/" className="footer__link">
          Home
        </a>
        <a
          href="https://tripleten.com"
          className="footer__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          TripleTen
        </a>
      </nav>
      <div className="footer__social">
        <a
          href="https://github.com/hadz44/Final-Project"
          className="footer__social-link"
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://newsapi.org"
          className="footer__social-link"
          aria-label="News API"
          target="_blank"
          rel="noopener noreferrer"
        >
          News API
        </a>
      </div>
    </footer>
  )
}

export default Footer

