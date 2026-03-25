import { Loader2 } from 'lucide-react';

const Spinner = () => (
  <div className="flex min-h-48 items-center justify-center">
    <Loader2 className="h-10 w-10 animate-spin text-white" />
  </div>
);

export default Spinner;
