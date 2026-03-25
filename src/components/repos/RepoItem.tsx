import { ExternalLink } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { RepoItemProps } from '@/types/repo';

const RepoItem: React.FC<RepoItemProps> = ({
  repo: { html_url, name, description },
}) => {
  return (
    <Card className="border-0 shadow-sm transition-all duration-200 hover:shadow-md">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex flex-col gap-y-4">
          <span className="text-sm font-bold text-card-foreground">{name}</span>
          <span className="text-sm font-medium text-card-foreground">
            {description}
          </span>
        </div>
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-medium text-accent hover:underline"
        >
          View
          <ExternalLink className="h-3 w-3" />
        </a>
      </CardContent>
    </Card>
  );
};

export default RepoItem;
