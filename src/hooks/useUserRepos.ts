import { useQuery } from '@tanstack/react-query';

import { fetchUserRepos } from '../api/github';

export const useUserRepos = (username: string | undefined) =>
  useQuery({
    enabled: !!username,
    queryFn: () => fetchUserRepos(username!),
    queryKey: ['repos', username],
  });
