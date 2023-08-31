import React, { lazy, Suspense , useState } from 'react';

const AjouterUnNouveauProjet = lazy(() => import('./AjouterUnNouveauProjet'));
const TableProjet = lazy(() => import('./TableProjet'));
const SelectedProjet = lazy(() => import('./SelectedProjet'));
const AjouterProjet = lazy(() => import('./AjouterProjet'));
const EmptyProjects = lazy(() => import('./EmptyProjects'));

function ContProjetUn() {
  const [displayForm, setDisplayForm] = useState(false);

  return (
    <div className="container-fluid">
      <Suspense fallback={<div>Loading...</div>}>
      {displayForm ? (
        <AjouterUnNouveauProjet />
      ) : (
        <AjouterProjet onClick={() => setDisplayForm(true)} />
      )}
        <EmptyProjects />
        <TableProjet />
        <SelectedProjet />
      </Suspense>
    </div>
  );
}

export default ContProjetUn;
