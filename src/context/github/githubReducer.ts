import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';
import { User } from '../../types/user';
import { Repo } from '../../types/repo';

// Define the state shape
interface GithubState {
  users: User[];
  user: User | null;
  repos: Repo[];
  loading: boolean;
}

// Define action types
type GithubAction =
  | { type: typeof SEARCH_USERS; payload: User[] }
  | { type: typeof GET_USER; payload: User }
  | { type: typeof CLEAR_USERS }
  | { type: typeof GET_REPOS; payload: Repo[] }
  | { type: typeof SET_LOADING };

const GithubReducer = (
  state: GithubState,
  action: GithubAction,
): GithubState => {
  switch (action.type) {
    case SEARCH_USERS:
      return { ...state, users: action.payload, loading: false };
    case GET_USER:
      return { ...state, user: action.payload, loading: false };
    case CLEAR_USERS:
      return { ...state, users: [], loading: false };
    case GET_REPOS:
      return { ...state, repos: action.payload, loading: false };
    case SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default GithubReducer;
