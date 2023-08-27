import React, { lazy, Suspense } from 'react';

const PartOne = lazy(() => import('./PartOne'));
const TableProjet = lazy(() => import('./TableProjet'));
const SelectedProjet = lazy(() => import('./SelectedProjet'));
const AjouterProjet = lazy(() => import('./AjouterProjet'));
const EmptyProjects = lazy(() => import('./EmptyProjects'));

function ContProjetUn() {
  return (
    <div className="container-fluid">
      <Suspense fallback={<div>Loading...</div>}>
        <AjouterProjet />
        <EmptyProjects />
        <PartOne />
        <TableProjet />
        <SelectedProjet />
      </Suspense>
    </div>
  );
}

export default ContProjetUn;
