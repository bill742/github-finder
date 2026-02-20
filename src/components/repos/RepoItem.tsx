import { RepoItemProps } from '../../types/repo';

const RepoItem: React.FC<RepoItemProps> = ({
  repo: { name, html_url, description },
}) => {
  return (
    <div className="card">
      <h3>
        <a href={html_url}>{name}</a>
      </h3>
    </div>
  );
};

export default RepoItem;
