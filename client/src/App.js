import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import './App.css';
import AboutMe from './components/AboutMe';
import Education from './components/Education';
import Skills from './components/Skills';
import Awards from './components/Awards';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

const App = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(true);
  const [AboutMeData, setAboutMeData] = useState({ about: {}, links: [] });
  const [EducationData, setEducationData] = useState([]);
  const [SkillsData, setSkillsData] = useState([]);
  const [AwardsData, setAwardsData] = useState([]);
  const [ProjectsData, setProjectsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAboutMeData({ about: data.about, links: data.links });
        setEducationData(data.education);
        
        setSkillsData(data.skills);
        setProjectsData(data.projects);
        setAwardsData(data.awards);

      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>

      {loading ? (
        <Loader />
      ) : (
        <>
      <Sidebar data={AboutMeData.about} />
          <div className="container-fluid p-0">
            <AboutMe data={AboutMeData.about} links={AboutMeData.links} />
           
            <Education data={EducationData} />
            <Skills data={SkillsData} />
            <Projects data={ProjectsData} />
            <Awards data={AwardsData} />
            <ContactForm />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
