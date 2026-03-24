import axios from 'axios';
import { User } from '../types/user';
import { Repo } from '../types/repo';

const getCredentialParams = (): Record<string, string> => {
  const isProd = import.meta.env.MODE === 'production';
  const clientId = isProd
    ? import.meta.env.GITHUB_CLIENT_ID
    : import.meta.env.VITE_GITHUB_CLIENT_ID;
  const clientSecret = isProd
    ? import.meta.env.GITHUB_CLIENT_SECRET
    : import.meta.env.VITE_GITHUB_CLIENT_SECRET;

  if (clientId && clientSecret) {
    return { client_id: clientId, client_secret: clientSecret };
  }
  return {};
};

const GITHUB_API = 'https://api.github.com';

export const fetchUser = async (username: string): Promise<User> => {
  const params = new URLSearchParams(getCredentialParams());
  const query = params.toString() ? `?${params}` : '';
  const { data } = await axios.get<User>(
    `${GITHUB_API}/users/${username}${query}`,
  );
  return data;
};

export const fetchUserRepos = async (username: string): Promise<Repo[]> => {
  const params = new URLSearchParams({
    per_page: '5',
    sort: 'created:asc',
    ...getCredentialParams(),
  });
  const { data } = await axios.get<Repo[]>(
    `${GITHUB_API}/users/${username}/repos?${params}`,
  );
  return data;
};

export const searchUsers = async (text: string): Promise<User[]> => {
  const params = new URLSearchParams({
    q: text,
    ...getCredentialParams(),
  });
  const { data } = await axios.get<{ items: User[] }>(
    `${GITHUB_API}/search/users?${params}`,
  );
  return data.items;
};
