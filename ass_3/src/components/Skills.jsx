const frontend = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Angular 17",
  "Tailwind CSS"
];

const backend = [
  "Python",
  "Django 4",
  "Django REST Framework",
  "PostgreSQL",
  "SQLite"
];

const tools = [
  "Git",
  "GitHub",
  "Linux",
  "npm",
  "Postman"
];

function SkillGroup({ number, title, skills }) {
  return (
    <div className="skill-group">
      <span className="skill-number">{number}</span>

      <h3>{title}</h3>

      <div className="skill-list">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section className="skills-section" id="skills">
        <div className="marquee">
  <div className="portal-text portal-text-one">
    REACT ✦ JAVASCRIPT ✦ ANGULAR ✦ DJANGO ✦
  </div>

  <div className="portal-text portal-text-two">
    REACT ✦ JAVASCRIPT ✦ ANGULAR ✦ DJANGO ✦
  </div>
</div>

      <div className="section skills-inner">

        <div className="section-number">
          03 / TOOLBOX
        </div>

        <h2 className="section-title">
          WHAT I <span>WORK WITH.</span>
        </h2>

        <div className="skills-grid">
          <SkillGroup
            number="01"
            title="FRONTEND"
            skills={frontend}
          />

          <SkillGroup
            number="02"
            title="BACKEND"
            skills={backend}
          />

          <SkillGroup
            number="03"
            title="TOOLS"
            skills={tools}
          />
        </div>

      </div>

    </section>
  );
}

export default Skills;