import React from 'react';
import { MantineProvider } from '@mantine/core';
import TokenInput from '../../components/TokenInput';

import Title from '../../components/Title';
import './Popup.css';

function Popup() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <div className="App">
        <Title />
        <TokenInput />
      </div>
    </MantineProvider>
  );
}

export default Popup;
