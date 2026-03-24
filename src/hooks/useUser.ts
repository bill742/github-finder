import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../api/github';

export const useUser = (username: string | undefined) =>
  useQuery({
    queryKey: ['user', username],
    queryFn: () => fetchUser(username!),
    enabled: !!username,
  });
