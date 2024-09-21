import React from 'react';

const AboutMe = ({ data, links }) => {
  console.log(links)
  const getIconClass = (icon) => {
    switch (icon) {
      case 'linkedin':
        return 'fa fa-linkedin';
      case 'github':
        return 'fa fa-github';
      case 'twitter':
        return 'fa fa-twitter';
      case 'facebook':
        return 'fa fa-facebook-f';
      case 'resume':
          return 'fa fa-file-text';
      default:
        return '';
    }
  };

  return (
    <section className="resume-section p-3 p-lg-5 d-flex flex-column" id="about">
      <div className="my-auto">
        <h1 className="mb-0">{data.firstName}
          <span className="text-primary"> {data.lastName}</span>
        </h1>
        <div class="subheading mb-5">{data.subheading}</div>
        <p className="mb-5">{data.details}</p>
        <div className="social-icons">
          {links.map((link, index) => (
              <a 
                key={index} 
                className="social-icon" 
                href={link.link} 
                target="_blank" 
                rel="noopener noreferrer"
                alt={link.alt}
                // {...(link.download && { download: true })}
              >
                <i className={getIconClass(link.icon)}></i>
              </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
