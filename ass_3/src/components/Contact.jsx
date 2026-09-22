function Contact() {
  return (
    <section className="contact" id="contact">

      <div className="section-number">
        05 / CONTACT
      </div>

      <p className="contact-small">
        HAVE AN IDEA?
      </p>

      <h2>
        LET'S BUILD
        <br />
        <span>SOMETHING.</span>
      </h2>

      <div className="contact-bottom">

        <div className="contact-links">

          <a
            href="https://github.com/Shoinbekov"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span>↗</span>
          </a>

          <a href="mailto:s.shoinbekov@gmail.com">
            Email <span>↗</span>
          </a>

        </div>

        <div className="location">
          <span>LOCATION</span>
          <p>Almaty, Kazakhstan</p>
        </div>

      </div>

      <footer>
        <p>© 2026 SHOINBEK SHOINBEKOV</p>
        <p>DESIGNED & BUILT WITH REACT</p>
      </footer>

    </section>
  );
}

export default Contact;