import React from 'react';
import { Theme } from '@carbon/react';
import { UIHeader } from '@components/UIHeader';
import { RouterView } from '@components/RouterView';
import './app.scss';

export const App = () => {
  return (
    <Theme className="app" theme="white">
      <UIHeader />
      <RouterView />
    </Theme>
  );
};
