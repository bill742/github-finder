import axios from 'axios';

import { Repo } from '../types/repo';
import { User } from '../types/user';

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
    per_page: '10',
    sort: 'updated:asc',
    ...getCredentialParams(),
  });
  const { data } = await axios.get<Repo[]>(
    `${GITHUB_API}/users/${username}/repos?${params}`,
  );
  return data;
};

const SEARCH_PER_PAGE = 28;
// GitHub caps search results at 1000
const GITHUB_SEARCH_MAX = 1000;

export const searchUsers = async (
  text: string,
  page: number = 1,
): Promise<{ items: User[]; totalCount: number; totalPages: number }> => {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(SEARCH_PER_PAGE),
    q: text,
    ...getCredentialParams(),
  });
  const { data } = await axios.get<{ items: User[]; total_count: number }>(
    `${GITHUB_API}/search/users?${params}`,
  );
  const totalPages = Math.ceil(
    Math.min(data.total_count, GITHUB_SEARCH_MAX) / SEARCH_PER_PAGE,
  );
  return { items: data.items, totalCount: data.total_count, totalPages };
};
