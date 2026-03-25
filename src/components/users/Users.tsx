import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useSearchUsers } from '@/hooks/useSearchUsers';

import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

interface UsersProps {
  onClear: () => void;
  text: string;
}

const Users: React.FC<UsersProps> = ({ onClear, text }) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [text]);

  const { data, isError, isLoading } = useSearchUsers(text, page);
  const users = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalCount = data?.totalCount ?? 0;

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className="mx-auto max-w-md rounded-xl border border-white/20 bg-white/15 px-4 py-3 text-center text-sm text-white">
        Something went wrong. Please try again.
      </div>
    );

  return (
    <>
      {users.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-8">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-light text-white/70">
              {totalCount.toLocaleString()} result{totalCount !== 1 ? 's' : ''} found
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={onClear}
              className="gap-1.5 border-white/30 bg-transparent text-white hover:bg-white/15 hover:text-white"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {users.map((user) => (
              <UserItem key={user.id.toString()} user={user} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="gap-1 border-white/30 bg-transparent text-white hover:bg-white/15 hover:text-white disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </Button>
              <span className="text-sm text-white/70">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className="gap-1 border-white/30 bg-transparent text-white hover:bg-white/15 hover:text-white disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {users.length === 0 && text && (
        <div className="mx-auto max-w-md rounded-xl border border-white/20 bg-white/10 px-4 py-8 mt-8 text-center">
          <p className="text-white/80">
            No users found for &ldquo;{text}&rdquo;. Try a different search.
          </p>
        </div>
      )}
    </>
  );
};

export default Users;
