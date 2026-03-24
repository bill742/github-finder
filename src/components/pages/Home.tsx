import React, { Fragment, useState } from 'react';

import Search from '../users/Search';
import Users from '../users/Users';

const Home = () => {
  const [text, setText] = useState('');

  return (
    <Fragment>
      <Search onSearch={setText} />
      <Users text={text} onClear={() => setText('')} />
    </Fragment>
  );
};

export default Home;
