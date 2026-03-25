import { Link } from 'react-router-dom';

import GithubIcon from '../gitHubIcon';
import NavBarItem from './NavBarItem';

const navItems = [
  { id: 1, name: 'Home', path: '/' },
  { id: 2, name: 'About', path: '/about' },
];

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
        {navItems.map((item) => (
          <NavBarItem key={item.id} name={item.name} path={item.path} />
        ))}
      </ul>
    </div>
  </nav>
);

export default Navbar;
