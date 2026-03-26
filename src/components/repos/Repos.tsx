import { FC } from 'react';

import { ReposProps } from '@/types/repo';

import RepoItem from './RepoItem';

const Repos: FC<ReposProps> = ({ repos }) => {
  return (
    <div className="space-y-2">
      {repos.map((repo) => (
        <RepoItem key={repo.id.toString()} repo={repo} />
      ))}
    </div>
  );
};

export default Repos;
