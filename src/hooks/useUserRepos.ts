import { useQuery } from '@tanstack/react-query';
import { fetchUserRepos } from '../api/github';

export const useUserRepos = (username: string | undefined) =>
  useQuery({
    queryKey: ['repos', username],
    queryFn: () => fetchUserRepos(username!),
    enabled: !!username,
  });
