import React, { lazy, Suspense, useState, useEffect } from 'react';
import axios from 'axios';

const AjouterUnNouveauProjet = lazy(() => import('./AjouterUnNouveauProjet'));
const TableProjet = lazy(() => import('./TableProjet'));
const SelectedProjet = lazy(() => import('./SelectedProjet'));
const AjouterProjet = lazy(() => import('./AjouterProjet'));
const EmptyProjects = lazy(() => import('./EmptyProjects'));

function ContProjetUn() {
  const [displayForm, setDisplayForm] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjectList = () => {
      axios.get('http://127.0.0.1:8000/projets/list')
        .then(response => {
          setProjectList(response.data);
        })
        .catch(error => {
          console.error('Error fetching project list:', error);
        });
    };

    fetchProjectList();

    const refreshInterval = setInterval(() => {
      fetchProjectList();
    }, 3000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const handleSeeDetailsClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="container-fluid">
      <Suspense fallback={<div>Loading...</div>}>
        {displayForm ? (
          <AjouterUnNouveauProjet />
        ) : (
          <AjouterProjet onClick={() => setDisplayForm(true)} />
        )}

        {projectList.length === 0 ? (
          <EmptyProjects />
        ) : selectedProject ? (
          <SelectedProjet selectedProject={selectedProject} />
        ) : (
          <TableProjet projects={projectList} onSeeDetailsClick={handleSeeDetailsClick} />
        )}
      </Suspense>
    </div>
  );
}

export default ContProjetUn;
