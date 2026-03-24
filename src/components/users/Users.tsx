import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import { useQuery } from '@tanstack/react-query';
import { searchUsers } from '../../api/github';

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

interface UsersProps {
  text: string;
  onClear: () => void;
}

const Users: React.FC<UsersProps> = ({ text, onClear }) => {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['searchUsers', text],
    queryFn: () => searchUsers(text),
    enabled: !!text,
  });

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="alert alert-light">
        Something went wrong. Please try again.
      </p>
    );

  return (
    <>
      {users.length > 0 && (
        <>
          <button
            className="btn btn-light btn-block"
            onClick={onClear}
            type="button"
          >
            Clear
          </button>

          <div style={userStyle}>
            {users.map((user) => (
              <UserItem key={user.id.toString()} user={user} />
            ))}
          </div>
        </>
      )}

      {users.length === 0 && (
        <p className="alert alert-light">No users found. Please try again.</p>
      )}
    </>
  );
};

export default Users;
