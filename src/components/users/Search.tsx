import { Search as SearchIcon } from 'lucide-react';
import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchProps {
  onSearch: (text: string) => void;
}

const Search: FC<SearchProps> = ({ onSearch }) => {
  const [text, setText] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(text);
    setText('');
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  return (
    <div className="mx-auto mb-10 max-w-2xl px-4 pt-16 text-center">
      <div className="mb-3 flex items-center justify-center gap-2">
        <div className="h-px w-12 bg-white/40" />
        <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
          Explore
        </span>
        <div className="h-px w-12 bg-white/40" />
      </div>
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Search GitHub Users
      </h1>
      <p className="mb-8 text-lg font-light text-white/75">
        Find and explore GitHub profiles, repositories, and more.
      </p>
      <form onSubmit={onSubmit} className="flex gap-2">
        <Input
          type="text"
          name="text"
          aria-label="GitHub username"
          placeholder="Search by username..."
          value={text}
          onChange={onChange}
          required
          className="flex-1 border-white/30 bg-white/15 text-base text-white placeholder:text-white/50 focus-visible:ring-white"
        />
        <Button
          type="submit"
          size="lg"
          className="gap-2 bg-primary text-secondary hover:bg-primary/90"
        >
          <SearchIcon className="h-4 w-4" />
          Search
        </Button>
      </form>
    </div>
  );
};

export default Search;
