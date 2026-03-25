import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center py-20 text-center">
      <p className="mb-2 text-7xl font-bold text-white/30">404</p>
      <h1 className="mb-2 text-2xl font-semibold text-white">Page Not Found</h1>
      <p className="mb-6 text-white/70">
        The page you are looking for does not exist.
      </p>
      <Button
        asChild
        size="sm"
        className="gap-2 bg-primary text-white hover:bg-primary/80"
      >
        <Link to="/">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
