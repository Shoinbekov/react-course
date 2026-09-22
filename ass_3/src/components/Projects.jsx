const projects = [
  {
    number: "01",
    title: "MODERN STORE",
    category: "FULL-STACK E-COMMERCE",
    tech: "Angular 17 · Django REST Framework · JWT · PostgreSQL"
  },
  {
    number: "02",
    title: "DJANGO FULL STORE",
    category: "BACKEND API",
    tech: "Django · DRF · Python"
  },
  {
    number: "03",
    title: "3D IMAGE EFFECT",
    category: "FRONTEND EXPERIMENT",
    tech: "HTML · CSS"
  },
  {
    number: "04",
    title: "MULTI LANGUAGE",
    category: "MULTILINGUAL INTERFACE",
    tech: "HTML · CSS · JavaScript"
  }
];

function Projects() {
  return (
    <section className="section projects" id="projects">

      <div className="section-number">
        04 / SELECTED WORK
      </div>

      <div className="projects-heading">
        <h2>
          THINGS I'VE
          <br />
          <span>BUILT.</span>
        </h2>

        <p>
          A selection of academic and personal projects
          exploring frontend and full-stack development.
        </p>
      </div>

      <div className="project-list">

        {projects.map((project) => (
          <div className="project" key={project.number}>

            <span className="project-number">
              {project.number}
            </span>

            <div className="project-name">
              <p>{project.category}</p>
              <h3>{project.title}</h3>
              <span>{project.tech}</span>
            </div>

            <div className="project-arrow">
              ↗
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Projects;