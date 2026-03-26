import { Search, Users } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

import GithubIcon from '../gitHubIcon';

const About = () => {
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
              <GithubIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white">
            About GitHub Finder
          </h1>
          <p className="text-white/75">
            A modern tool for exploring GitHub profiles.
          </p>
          <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
            v0.3.0
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-0 shadow-lg">
            <CardContent className="flex gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Search className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="mb-1 font-semibold text-card-foreground">
                  User Search
                </h2>
                <p className="text-sm text-muted-foreground">
                  Search for any GitHub user by username and explore their
                  public profile.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="flex gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="mb-1 font-semibold text-card-foreground">
                  Profile Details
                </h2>
                <p className="text-sm text-muted-foreground">
                  View followers, repositories, and other public information
                  about any GitHub user.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default About;
