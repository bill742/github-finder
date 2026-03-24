import React, { FormEvent, useState, ChangeEvent } from 'react';

interface SearchProps {
  onSearch: (text: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [text, setText] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(text);
    setText('');
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          id=""
          placeholder="Search Users"
          value={text}
          onChange={onChange}
          required
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
    </div>
  );
};

export default Search;
