export type User = {
  login: string;
  avatar_url: string;
  html_url: string;
  id: number;
  type: string;
  name?: string | null;
  company?: string | null;
  blog?: string | null;
  location?: string | null;
  email?: string | null;
  bio?: string | null;
  twitter_username?: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  hireable?: boolean | null;
};

export type UserItemProps = {
  user: UserSearchResult;
};

export type UserSearchResult = {
  login: string;
  avatar_url: string;
  html_url: string;
  id: number;
};
