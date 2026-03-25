import { Link } from 'react-router-dom';

const NavBarItem = ({ name, path }: { name: string; path: string }) => {
  return (
    <li>
      <Link
        to={path}
        className="rounded-md px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/15 hover:text-white"
      >
        {name}
      </Link>
    </li>
  );
};

export default NavBarItem;
