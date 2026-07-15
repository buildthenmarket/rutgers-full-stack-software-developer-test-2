function Footer() {
  return (
    <footer className="app-footer">
      <p className="mb-0">&copy; 2026 Build Then Market.</p>
      <ul className="footer-content">
        <li>
          <a href="contact-us">
            <img
              src="/icon-contact-us.png"
              alt="contact us via Email"
            ></img>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com">
            <img src="/icon-instagram.png" alt="Insta"></img>
          </a>
        </li>
        <li>
          <a href="https://x.com">
            <img src="/icon-x.png" alt="x"></img>
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com">
            <img src="/icon-facebook.png" alt="Facebook"></img>
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
