import React from 'react';

const Projects = ({ data }) => {
  return (
    <section className="resume-section p-3 p-lg-5 d-flex flex-column" id="projects">
      <div className="resume-section-content my-auto">
        <h2 className="mb-5">Projects</h2>
        {data.map((project, index) => (
          <div key={index} className="mb-3">
            <h3>{project.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: project.details }}></p>

            {project.link && (
              <p>
                <strong>Project Link:</strong>{' '}
                <a href={project['link']} target="_blank" rel="noopener noreferrer">
                  {project['link']}
                </a>
              </p>
            )}
            {project['git-link'] && (
              <p>
                <strong>GitHub Link:</strong>{' '}
                <a href={project['git-link']} target="_blank" rel="noopener noreferrer">
                  {project['git-link']}
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
