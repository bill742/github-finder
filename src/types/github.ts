import { User } from './user';
import { Repo } from './repo';

export type GithubContextType = {
  users: User[];
  user: User | null;
  repos: Repo[];
  loading: boolean;
  searchUsers: (text: string) => Promise<void>;
  clearUsers: () => void;
  getUser: (username: string) => Promise<void>;
  getUserRepos: (username: string) => Promise<void>;
};
