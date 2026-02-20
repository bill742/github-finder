import React, { FormEvent, useState, ChangeEvent } from 'react';
import { useGithubContext } from '../../context/github/githubContext';
import { useAlertContext } from '../../context/alert/alertContext';

const Search: React.FC = () => {
  const { setAlert } = useAlertContext();
  const { searchUsers, clearUsers, users } = useGithubContext();

  const [text, setText] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter something', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
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
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>

      {users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={clearUsers}
          type="button"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
