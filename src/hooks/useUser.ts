import { useQuery } from '@tanstack/react-query';

import { fetchUser } from '../api/github';

export const useUser = (username: string | undefined) =>
  useQuery({
    enabled: !!username,
    queryFn: () => fetchUser(username!),
    queryKey: ['user', username],
  });
