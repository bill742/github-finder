import React from 'react';
import { ReposProps } from '../../types/repo';
import RepoItem from './RepoItem';

const Repos: React.FC<ReposProps> = ({ repos }) => {
  return repos.map((repo) => <RepoItem repo={repo} key={repo.id.toString()} />);
};

export default Repos;
