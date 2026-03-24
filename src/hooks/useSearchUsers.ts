import { useQuery } from '@tanstack/react-query';

import { searchUsers } from '../api/github';

export const useSearchUsers = (text: string) =>
  useQuery({
    enabled: !!text,
    queryFn: () => searchUsers(text),
    queryKey: ['searchUsers', text],
  });
