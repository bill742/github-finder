export type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  id: number;
};

export type RepoItemProps = {
  repo: Repo;
};

export type ReposProps = {
  repos: Repo[];
};
