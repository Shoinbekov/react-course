function About() {
  return (
    <section className="section about" id="about">

      <div className="section-number">
        02 / ABOUT
      </div>

      <div className="about-grid">

        <h2>
          I DON'T JUST
          <br />
          WRITE <span>CODE.</span>
          <br />
          I BUILD
          <br />
          EXPERIENCES.
        </h2>

        <div className="about-text">
          <p>
            I'm a fourth-year student at Kazakh-British
            Technical University, studying Computer Engineering
            and Software.
          </p>

          <p>
            I'm focused on modern web development and enjoy
            building responsive interfaces and full-stack
            applications.
          </p>

          <div className="about-info">
            <div>
              <span>FOCUS</span>
              <strong>Web Development</strong>
            </div>

            <div>
              <span>EDUCATION</span>
              <strong>KBTU</strong>
            </div>

            <div>
              <span>LOCATION</span>
              <strong>Almaty, Kazakhstan</strong>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}

export default About;