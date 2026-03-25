import {
  ArrowLeft,
  BookOpen,
  Building2,
  CheckCircle2,
  ExternalLink,
  Globe,
  MapPin,
  Users as UsersIcon,
  XCircle,
} from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/hooks/useUser';
import { useUserRepos } from '@/hooks/useUserRepos';

import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';

const User: React.FC = () => {
  const { login } = useParams<{ login: string }>();

  const { data: user, isError, isLoading: userLoading } = useUser(login);
  const { data: repos = [], isLoading: reposLoading } = useUserRepos(login);

  const loading = userLoading || reposLoading;

  if (loading) return <Spinner />;

  if (isError || !user) {
    return (
      <div className="py-12 text-center">
        <Button
          asChild
          variant="outline"
          className="mb-4 border-white/30 text-white hover:bg-white/15"
        >
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Link>
        </Button>
        <p className="text-white/80">Could not load user profile.</p>
      </div>
    );
  }

  const {
    avatar_url,
    bio,
    blog,
    company,
    followers,
    following,
    hireable,
    html_url,
    location,
    login: userLogin,
    name,
    public_gists,
    public_repos,
  } = user;

  return (
    <div className="mx-auto max-w-4xl space-y-5 px-4 py-8">
      <Button
        asChild
        variant="outline"
        size="sm"
        className="gap-2 border-white/30 bg-transparent text-white hover:bg-white/15 hover:text-white"
      >
        <Link to="/">
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </Link>
      </Button>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex flex-col items-center gap-3 ">
              <img
                src={avatar_url}
                alt={`${userLogin}'s avatar`}
                className="h-28 w-28 rounded-full ring-4 ring-secondary"
              />
              {hireable !== null && (
                <div className="flex items-center gap-1.5 text-sm">
                  {hireable ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-primary font-medium">
                        Available for hire
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Not for hire
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl font-bold text-card-foreground">
                  {name || userLogin}
                </h1>
                <p className="text-muted-foreground">@{userLogin}</p>
              </div>

              {bio && <p className="text-sm text-muted-foreground">{bio}</p>}

              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                {location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {location}
                  </span>
                )}
                {company && (
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" />
                    {company}
                  </span>
                )}
                {blog && (
                  <a
                    href={blog.startsWith('http') ? blog : `https://${blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-accent hover:underline"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    {blog}
                  </a>
                )}
              </div>

              <Button
                asChild
                size="sm"
                className="gap-2 bg-primary text-white hover:bg-primary/80"
              >
                <a href={html_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" />
                  View GitHub Profile
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardContent className="flex flex-col items-center gap-1 p-4 text-center">
            <UsersIcon className="h-5 w-5 text-accent" />
            <span className="text-2xl font-bold text-card-foreground">
              {followers.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">Followers</span>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="flex flex-col items-center gap-1 p-4 text-center">
            <UsersIcon className="h-5 w-5 text-accent" />
            <span className="text-2xl font-bold text-card-foreground">
              {following.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">Following</span>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="flex flex-col items-center gap-1 p-4 text-center">
            <BookOpen className="h-5 w-5 text-accent" />
            <span className="text-2xl font-bold text-card-foreground">
              {public_repos.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">Public Repos</span>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="flex flex-col items-center gap-1 p-4 text-center">
            <BookOpen className="h-5 w-5 text-accent" />
            <span className="text-2xl font-bold text-card-foreground">
              {public_gists.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">Public Gists</span>
          </CardContent>
        </Card>
      </div>

      {repos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-white">
              Recent Repositories
            </h2>
            <Badge className="bg-white/20 text-white">{repos.length}</Badge>
          </div>
          <Repos repos={repos} />
        </div>
      )}
    </div>
  );
};

export default User;
