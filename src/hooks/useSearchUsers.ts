import { useQuery } from '@tanstack/react-query';
import { searchUsers } from '../api/github';

export const useSearchUsers = (text: string) =>
  useQuery({
    queryKey: ['searchUsers', text],
    queryFn: () => searchUsers(text),
    enabled: !!text,
  });
