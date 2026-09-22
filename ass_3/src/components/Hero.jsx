function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-decoration decoration-one"></div>
      <div className="hero-decoration decoration-two"></div>

      <div className="hero-content">

        <p className="eyebrow reveal delay-1">
          HELLO, I'M
        </p>

        <h1 className="hero-title">
          <span className="reveal delay-2">SHOINBEK</span>
          <span className="outline-text reveal delay-3">
            SHOINBEKOV
          </span>
        </h1>

        <div className="hero-bottom reveal delay-4">
          <div>
            <p className="role">FULL-STACK DEVELOPER</p>

            <p className="hero-description">
              I build modern, interactive and functional
              experiences for the web.
            </p>

            <a href="#projects" className="main-button">
              VIEW MY WORK
              <span>↘</span>
            </a>
          </div>

          <div className="portrait-wrapper">
            <div className="portrait-glow"></div>

            <div className="portrait">
  <img
    src={`${import.meta.env.BASE_URL}myimage2.jpg`}
    alt="Shoinbek Shoinbekov"
  />
</div>

            <div className="available">
              <span className="status-dot"></span>
              OPEN TO OPPORTUNITIES
            </div>
          </div>
        </div>

      </div>

      <div className="scroll-text">
        <span>01</span>
        SCROLL TO EXPLORE
        <span>↓</span>
      </div>

    </section>
  );
}

export default Hero;