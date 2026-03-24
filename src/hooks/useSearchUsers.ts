import { useQuery } from '@tanstack/react-query';

import { searchUsers } from '../api/github';

export const useSearchUsers = (text: string, page: number) =>
  useQuery({
    enabled: !!text,
    queryFn: () => searchUsers(text, page),
    queryKey: ['searchUsers', text, page],
  });
