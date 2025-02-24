import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__text">Developed by Ridy Rousseau</p>
      <p className="footer__date-copyright">&#169; {currentYear}</p>
    </footer>
  );
}

export default Footer;
