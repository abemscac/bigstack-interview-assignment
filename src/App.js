import React from 'react';
import { Theme } from '@carbon/react';
import UIHeader from '@components/UIHeader';
import './app.scss';
import RouterView from '@components/RouterView';

const App = () => {
  return (
    <Theme className="app" theme="white">
      <UIHeader />
      <RouterView />
    </Theme>
  );
};

export default App;
