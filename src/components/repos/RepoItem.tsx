import { RepoItemProps } from '../../types/repo';

const RepoItem: React.FC<RepoItemProps> = ({ repo: { name, html_url } }) => {
  return (
    <div className="card">
      <h3>
        <a href={html_url}>{name}</a>
      </h3>
    </div>
  );
};

export default RepoItem;
