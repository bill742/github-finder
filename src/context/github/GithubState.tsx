import { useReducer, useCallback, ReactNode } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';
import { GithubContextType } from '../../types/github';
import { User } from '../../types/user';
import { Repo } from '../../types/repo';

let githubClientId: string | undefined;
let githubClientSecret: string | undefined;

if (import.meta.env.MODE !== 'production') {
  githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  githubClientSecret = import.meta.env.VITE_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = import.meta.env.GITHUB_CLIENT_ID;
  githubClientSecret = import.meta.env.GITHUB_CLIENT_SECRET;
}

// interface ContextProps {
//   users: [];
//   user: {};
//   repos: [];
//   loading: boolean;
// }

interface GithubState {
  users: User[];
  user: User | null;
  repos: Repo[];
  loading: boolean;
}

interface GithubStateProps {
  children: ReactNode;
}

const GithubState: React.FC<GithubStateProps> = ({ children }) => {
  const initialState = {
    users: [],
    user: null,
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = useCallback(async (text: string): Promise<void> => {
    dispatch({ type: SET_LOADING });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`,
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  }, []);

  // Get User
  const getUser = useCallback(async (username: string): Promise<void> => {
    dispatch({ type: SET_LOADING });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`,
    );

    dispatch({ type: GET_USER, payload: res.data });
  }, []);

  // Get User Repos
  const getUserRepos = useCallback(async (username: string): Promise<void> => {
    dispatch({ type: SET_LOADING });

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`,
    );

    dispatch({ type: GET_REPOS, payload: res.data });
  }, []);

  // Clear Users
  const clearUsers = useCallback((): void => {
    dispatch({ type: CLEAR_USERS });
  }, []);

  // Create the context value matching GithubContextType
  const contextValue: GithubContextType = {
    users: state.users,
    user: state.user,
    repos: state.repos,
    loading: state.loading,
    searchUsers,
    clearUsers,
    getUser,
    getUserRepos,
  };

  return (
    <GithubContext.Provider value={contextValue}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubState;
