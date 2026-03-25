import type { Repo } from '../types/repo';
import type { User, UserSearchResult } from '../types/user';

// cSpell:disable

export const mockUserSearchResult: UserSearchResult = {
  avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  html_url: 'https://github.com/testuser',
  id: 1,
  login: 'testuser',
};

export const mockSearchResults: UserSearchResult[] = [
  mockUserSearchResult,
  {
    avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
    html_url: 'https://github.com/anotheruser',
    id: 2,
    login: 'anotheruser',
  },
  {
    avatar_url: 'https://avatars.githubusercontent.com/u/3?v=4',
    html_url: 'https://github.com/thirduser',
    id: 3,
    login: 'thirduser',
  },
];

export const mockUser: User = {
  avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
  bio: 'A test user bio',
  blog: 'https://testuser.dev',
  company: 'Test Corp',
  email: null,
  followers: 42,
  following: 10,
  hireable: true,
  html_url: 'https://github.com/testuser',
  id: 1,
  location: 'Test City',
  login: 'testuser',
  name: 'Test User',
  public_gists: 5,
  public_repos: 20,
  twitter_username: 'testuser',
  type: 'User',
};

export const mockRepos: Repo[] = [
  {
    description: 'A test repository',
    html_url: 'https://github.com/testuser/repo-one',
    id: 101,
    name: 'repo-one',
  },
  {
    description: null,
    html_url: 'https://github.com/testuser/repo-two',
    id: 102,
    name: 'repo-two',
  },
  {
    description: 'Third repository',
    html_url: 'https://github.com/testuser/repo-three',
    id: 103,
    name: 'repo-three',
  },
];
