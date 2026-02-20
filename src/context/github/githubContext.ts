import { createContext, useContext } from 'react';
import { GithubContextType } from '../../types/github';

const GithubContext = createContext<GithubContextType | undefined>(undefined);

export const useGithubContext = () => {
  const context = useContext(GithubContext);
  if (context === undefined) {
    throw new Error(
      'useGithubContext must be used within a GithubState provider',
    );
  }
  return context;
};

export default GithubContext;
