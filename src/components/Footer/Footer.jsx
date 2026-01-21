import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {currentYear} StockMarket, Powered by Stock Market Data API
      </p>
      <nav className="footer__nav">
        <a href="#" className="footer__link">
          Home
        </a>
        <a href="#" className="footer__link">
          Practicum by Yandex
        </a>
      </nav>
      <div className="footer__social">
        <a href="#" className="footer__social-link" aria-label="GitHub">
          GitHub
        </a>
        <a href="#" className="footer__social-link" aria-label="Facebook">
          Facebook
        </a>
      </div>
    </footer>
  )
}

export default Footer

