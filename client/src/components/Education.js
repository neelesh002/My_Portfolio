import React from 'react';

const Education = ({ data }) => {
  return (
    <section className="resume-section p-3 p-lg-5 d-flex flex-column" id="education">
      <div className="resume-section-content my-auto">
        <h2 className="mb-5">Education</h2>
        {data.map((education, index) => (
          <div key={index} className="d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="flex-grow-1">
              <h3 className="mb-0">{education.title}</h3>
              <div className="subheading mb-3">{education.college}</div>
            </div>
            <div className="flex-shrink-0"><span className="text-primary">{education.monthAndYear}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;