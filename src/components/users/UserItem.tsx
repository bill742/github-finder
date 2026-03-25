import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserItemProps } from '@/types/user';

const UserItem: React.FC<UserItemProps> = ({ user: { avatar_url, login } }) => {
  return (
    <Card className="group border-0 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="flex flex-col items-center gap-4 p-6">
        <img
          src={avatar_url}
          alt={`${login}'s avatar`}
          className="h-20 w-20 rounded-full ring-2 ring-secondary transition-all group-hover:ring-accent"
        />
        <div className="text-center">
          <h3 className="font-semibold text-card-foreground">{login}</h3>
        </div>
        <Button asChild size="sm" className="w-full bg-primary text-white hover:bg-primary/80">
          <Link to={`/user/${login}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserItem;
