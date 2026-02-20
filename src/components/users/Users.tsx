import { useGithubContext } from '../../context/github/githubContext';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

const Users = () => {
  const { loading, users } = useGithubContext();

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map((user) => (
          <UserItem key={user.id.toString()} user={user} />
        ))}
      </div>
    );
  }
};

export default Users;
