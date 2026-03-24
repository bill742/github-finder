import { Link } from 'react-router-dom';

import GithubIcon from '../gitHubIcon';

const Navbar = () => (
  <nav className="sticky top-0 z-50 border-b border-white/20 bg-background">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <Link
        to="/"
        className="flex items-center gap-2.5 text-white hover:text-white/80"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <GithubIcon className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight">GitHub Finder</span>
      </Link>
      <ul className="flex items-center gap-1">
        <li>
          <Link
            to="/"
            className="rounded-md px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="rounded-md px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            About
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
