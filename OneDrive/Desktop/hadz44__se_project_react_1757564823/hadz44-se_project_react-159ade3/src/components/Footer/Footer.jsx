import "./Footer.css";

function Footer({ year }) {
  return (
    <footer className="footer">
      <p className="footer__text">Developed by Hadi Frifer</p>
      <h1 className="footer__year">{year}</h1>
    </footer>
  );
}

export default Footer;
