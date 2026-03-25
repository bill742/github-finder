import { useState } from 'react';

import Search from '../users/Search';
import Users from '../users/Users';

const Home = () => {
  const [text, setText] = useState('');

  return (
    <>
      <div className="bg-secondary-background">
        <Search onSearch={setText} />
      </div>
      <Users onClear={() => setText('')} text={text} />
    </>
  );
};

export default Home;
